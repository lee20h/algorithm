---
sidebar: auto
---

# 도커 클라이언트 명령어

## 이미지 내부 파일 시스템

| docker | run | 이미지 이름 | 커맨드 |
|---|---|---|---|
| 도커 클라이언트 언급 | 컨테이너 생성 및 실행 | 이 컨테이너를 위한 이미지 | 이 자리는 원래 이미지가 가지고 있는 시작 명령어를 무시하고 여기에 있는 커맨드를 실행 |  

예를 들어서 명령어를 통해 이해해보자.  
`docker run alpine ls` alpine 이미지의 명령어를 `ls`명령어로 대체하여 alpine 이미지에서 실행된다.  

하지만 전에 했던 명령어인 `docker run hello-world`를 ls 명령어를 이용해서 사용하게 되면 에러가 난다. 왜냐하면 alpine 이미지 파일 스냅샷 안에 ls를 사용 가능하게 하는 파일이 있기 때문이다. 즉, hello-world 이미지에는 ls을 실행하게 하는 파일이 없다.  

따라서 파일 하드디스크안에 들어오는 스냅샷에 무엇이 있는지에 따라서 커맨드의 사용 가능 여부가 결정된다.  

## 컨테이너 나열

`docker ps`를 통해서 도커 클라이언트의 process status을 체크해보자. 

1. `docker alpine ping localhost`를 통해서 핑을 계속 보낸다.

2. 다른 터미널에서 `docker ps`를 통해서 컨테이너들을 확인해본다.

이러한 방법으로 체크를 하게 되면 컨테이너를 확인할 수 있다. 이때의 속성들을 적어봤다.  

- CONTAINER ID : 컨테이너의 고유한 아이디 해시값으로 일부분만 출력
- IMAGE : 컨테이너 생성시 사용한 도커 이미지
- COMMAND : 컨테이너 시작시 실행될 명령어로, 대부분 내장되어 있으므로 별도 설정 필요가 없다.
- CREATED : 컨테이너 생성 식나
- STATUS : 컨테이너의 상태로 실행중은 Up, 종료는 Exited, 일시정지는 Pause로 나온다.
- PORTS : 컨테이너가 개방한 포트와 호스트에 연결한 포트로, 특별한 설정을 하지 않은 경우 출력되지 않는다.
- NAMES : 컨테이너 고유한 이름으로 컨테이너 생성시 `--name` 옵션으로 이름을 설정하지 않으면 도커 엔진이 임의로 형용사와 명사를 조합해서 설정한다. id와 마찬가지로 중복이 안되고 `docker rename` 명령어로 이름을 변경할 수 있다. ex) `docker rename origianl-name changed-name`  


### 원하는 항목만 보기

`docker ps --format 'table{{.Names}} \t 'table{{.Image}}` 이러한 명령어로 원하는 항목만 볼 수 있다. `--format` 옵션을 사용하여 Names와 Image 항목만 볼 수 있다. 이때의 `\t`는 탭 공백을 의미한다.  

이외 모든 항목을 보고자 할때는 `docker ps -a`을 사용하면 된다. `-a`는 -all로, 꺼져있는 컨테이너도 확인할 수 있다.  


## 도커 컨테이너의 생명 주기

생명주기  

생성 -> 시작 -> 실행 -> 중지 -> 삭제  

### 생성부터 실행까지

`docker run` = `docker create <이미지 이름>` + `docker start <컨테이너 아이디/이름>`  

`docker create`을 사용하면 컨테이너의 ID가 출력이 된다. 이후 컨테이너의 아이디 중 일부를 `docker start` 뒤에 붙여주면 된다. 이때 `docker start`에 옵션이 존재하는데 바로 `-a` 옵션이다. 이것은 attach을 의미하며 실행이 될 때 붙어있다가 출력값들을 화면에 출력시킬 수 있게 보내주는 옵션이다. 이 옵션이 없이 `docker start ID`만 입력하게 되면 컨테이너 ID만 다시 출력하고 끝나게 된다.  

### 중지

중지 부분에는 두 가지 방법이 있다. 바로 `docker stop`과 `docker kill`이다.  
`docker stop <컨테이너ID/NAMES>`, `docker kill <컨테이너ID/NAMES>`로 문법도 유사하다.  

공통점은 실행중인 컨테이너를 중지시킨다.  

차이점은 Stop의 경우를 먼저 보면, Gracefully하게 중지를 시킨다. 즉, 그동안 하던 작업들을 완료하고 컨테이너를 중지시킨다.  

그에 반해, Kill은 Stop과 달리 기다리지 않고 바로 컨테이너를 중지 시킨다.  

이것을 구조적으로 보게 되면,  

`docker stop -> Sigterm -> Sigkill -> Container(main process)`  

`docker kill -> Sigkill -> Container(main process)`  

Stop은 Sigterm에서 Grace Period(정리 하는 시간)을 갖고 작업들을 완료한 뒤, 컨테이너를 중지시키는 시간을 갖게 된다.   
Kill은 이러한 시간이 없이 바로 중지시키기 때문에 결과가 차이가 난다.  

### 삭제

컨테이너 삭제는 중지 시킨 뒤 삭제가 가능하다.  
명령어는 `docker rm <중지된 컨테이너 ID/NAMES>`이다. 이 경우에는 각각 컨테이너의 이름이나 ID를 통해 하나하나 지울 수 있다.  

컨테이너를 모두 지울려면 다음과 같다.  
```
docker rm `docker ps -a -q`
```

이미지의 삭제는 `docker rmi <이미지 id>`를 통해서 하나씩 삭제할 수 있다.  

나중에 도커를 많이 이용하게되면 용량이 많이 쌓이게 된다. 이럴 때 도커를 사용하지 않은 경우 용량이 부담이 될 수 있다. 따라서 전부 삭제하는 부분을 봐보자. 이 명령어는 컨테이너, 이미지, 네트워크를 모두 삭제할 수 있다. 하지만, 현재 실행 중인 컨테이너는 지워지지 않으므로 편리하다.  
명령어는 `docker system prune`으로, 삭제한 뒤 삭제한 용량을 보여준다.  

## 실행중인 컨테이너에 명령어 전달

이미 실행중인 컨테이너에 명령어를 전달하고 싶을 때 사용하는 명령어  

`docker exec <컨테이너 ID> <명령어>`  

결과만 따지자면 위에서 공부한 `docker run <컨테이너 ID> <명령어>`와 같다. 하지만, run의 경우에는 새로 컨테이너를 만들어서 실행하고 exec은 이미 만들어진 컨테이너가 실행 중일 때만 사용할 수 있다.  

## 레디스를 이용한 컨테이너 이해

### 레디스의 작동

레디스 서버를 실행한 후, 레디스 클라이언트를 통해서 서버에 명령어를 전달해 줘야 한다.  
레디스 클라이언트 `set value1 hello` -> 레디스 서버  

이 부분을 도커를 통해 실행해보자.  

1. 먼저 첫 터미널로 레디스 서버를 작동 시키자.

2. 그 후 레디스 클라이언트를 키기 위해 다른 터미널을 켜 레디스 클라이언트를 다음 명령어로 작동시킨다. `redis-cli`을 작성한다.

3. 에러가 존재한다.  

에러의 이유를 찾아보면, 컨테이너 속에 레디스 서버가 동작 중인데, 레디스 클라이언트가 컨테이너 밖에서 실행을 할려하자 거부를 당하였다. 이러한 경우를 해결하기 위해서는 레디스 클라이언트도 레디스 서버와 같은 컨테이너 속에서 실행을 시켜야한다. 그러기 위해서는 이러한 명령어로 사용한다.  

`docker exec -it <컨테이너 아이디> redis-cli`  

위에서 공부한 `docker exec`를 이용해서 컨테이너 속에서 켜진 레디스 서버에 레디스 컨테이너를 켜보자.  

여기서 `-it`를 처음보는데 이 옵션은 interactive terminal을 따로 나눠서 붙인 약자로, exec를 통한 실행 후 다음 명령어를 입력할 수 있는 옵션이다. 따라서, `-it` 옵션이 없다면 레디스 클라이언트를 실행 후 바로 나와서 이어서 사용하지 못한다.  

## 마지막으로

지금까지 배운 내용으로는 실행중인 컨테이너에 명령어를 전달할 때에는 `docker exec -it <컨테이너 ID> <명령어>` 전부를 다 타이핑해서 사용하였다. 이러한 문제를 해결해주기 위한 방법이 있다.  

쉘이나 터미널 환경으로 접속을 하게 되면, 앞의 여러 명령어를 줄일 수 있다. 그 방법은 바로 `docker exec -it <컨테이너 ID> <명령어>`에서 명령어 부분에 `sh`, `bash`, `zsh`, `powershell`을 사용하면 된다. 이때 쉘 환경에 맞춰서 사용하면 된다. 여기서 exec가 아닌 run으로도 충분히 사용이 가능하다.

쉘에 접근해서 사용하고 나서 나오고 싶을 때 컨트롤 + C를 통해서 쉘에서 빠져나오질 못한다. 컨트롤 + D를 통해서만 나올 수 있으므로 주의해줘야한다.