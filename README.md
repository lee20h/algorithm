# 📙 Today I Learned  
## 규칙  
* 기억에 남는 내용 기록
* 쓸데없는 Commit 지양
* markdown으로 작성
* 1일 1문제(PS, SQL) 해결

---  

| [5월](./month/5월) | [6월](./month/6월) | [7월](./month/7월) |
|----|-----|-----|

---  

- 1日  

### Ajax HTTP 요청 헤더

**HTTP 헤더**  
클라이언트와 서버 사이에 이루어지는 HTTP 요청과 응답은 HTTP 헤더를 사용하여 수행됩니다. HTTP 헤더는 클라이언트와 서버와 서로에게 전달해야 할 다양한 종류의 데이터 포함한다.  

```
Accept: */*
Referer: http://codingsam.com/examples/tryit/tryhtml.php?filename=ajax_header_request_01
Accept-Language: ko-KR
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko
Host: codingsam.com
DNT: 1
Connection: Keep-Alive
```

- 헤더 이름, 콜론, 공백, 헤더 값의 순서로 구성
- 일부 헤더는 요청 헤더와 응답 헤더에 모두 사용되나, 일부 헤더는 둘 중 하나에서만 사용
- 요청 헤더는 원래 웹 브라우저가 자동으로 설정해서 보내므로, 사용자가 직접 설정 불가하나, Ajax를 이용하여 직접 설정하거나 확인 가능

HTTP 요청 헤더  
Ajax에서는 요청을 보내기 전에 setRequestHeader() 메소드를 사용하여 HTTP 요청 헤더를 작성 가능하다. 해당 메소드는 아래와 같다.
```
XMLHttpRequest인스턴스.setRequestHeader(헤더이름, 헤더값);
```
예제로는,
```
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
        document.getElementById("text").innerHTML = httpRequest.responseText;
    }
};
httpRequest.open("GET", "/examples/media/ajax_request_header.php", true);
httpRequest.setRequestHeader("testheader", "123");
httpRequest.send();
```

HTTP 응답 헤더  
- getAllResponseHeaders() 메소드 :  HTTP 응답 헤더의 모든 헤더를 문자열로 반환
- getResponseHeader() 메소드 :  HTTP 응답 헤더 중 인수로 전달받은 이름과 일치하는 헤더의 값을 문자열로 반환

```
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
        document.getElementById("text").innerHTML = httpRequest.responseText;
        document.getElementById("header").innerHTML = httpRequest.getAllResponseHeaders();
        document.getElementById("user").innerHTML =
            "testheader: " + httpRequest.getResponseHeader("testheader");
    }
};
httpRequest.open("GET", "/examples/media/ajax_response_header.php", true);
httpRequest.send();
```

Content-Type 헤더  
Content-Type 헤더의 값을 직접 설정하지 않으면, HTML 문서의 MIME 타입인 "text/html"로 자동 설정되며 Ajax 응용 프로그램에서 다루게 되는 XML은 일반적인 파일 형태의 XML 문서가 아니다. Ajax 요청을 받은 후 서버에서 실행되어 동적으로 생성되는 XML 형태의 데이터이므로 확장자가 `.xml`이 아니다. 따라서 header() 함수를 사용하여 응답 데이터의 MIME 타입이 `text/xml`이라고 명시해야한다.

```
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
        document.getElementById("text").value = httpRequest.responseText;
        document.getElementById("header").innerHTML = httpRequest.getAllResponseHeaders();
        document.getElementById("user").innerHTML =
            "testheader: " + httpRequest.getResponseHeader("tes
    }
};
httpRequest.open("GET", "/examples/media/ajax_response_header_xml.php", true);
httpRequest.send();
```

### Ajax 고급
다양한 Ajax 요청  

주기적으로 Ajax 요청하기  
Ajax는 클라이언트가 서버에 데이터를 요청하는 클라이언트 풀링 방식을 사용하므로, 서버 푸시 방식의 실시간 서비스를 만들 수 없다. 이 땐 주기적으로 Ajax 요청을 보내도록 설정하여, 실시간 서비스와 비슷한 동작을 하도록 만든다.  

0.5초마다 주기적으로 Ajax 요청을 보내 현재 서버 시간 출력하는 예제
```
function sendRequest() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
            document.getElementById("text").innerHTML = httpRequest.responseText;
        }
    };
    httpRequest.open("GET", "/examples/media/ajax_periodic_request.php");
    httpRequest.send();
}
sendRequest();
window.setInterval("sendRequest()", 500); // 매 0.5초마다 Ajax 요청을 보냄.
```
0.5초마다 XMLHttpRequest 객체를 계속 초기화한다. 이때 서버에서의 응답이 0.5초 이상 걸리게 되면 화면에는 아무것도 표시되지 않을 수도 있다.

```
function sendRequest() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
            document.getElementById("text").innerHTML = httpRequest.responseText;
            self.setTimeout("sendRequest()", 500); // 응답을 받은 후 0.5초 뒤에 다시 Ajax 요청을 보냄.
        }
    };
    httpRequest.open("GET", "/examples/media/ajax_periodic_request.php");
    httpRequest.send();
}
sendRequest();
```
해당 예제는 응답을 받고 나서 0.5초가 지난 후에 sendRequest() 함수를 다시 호출하는 예제다.  

데이터가 변경된 경우에만 Ajax 응답하기  
매번 요청하게 되면 네트워크와 서버의 자원을 많이 소모하게 된다. 따라서 웹 페이지의 내용이 변경된 경우 서버가 응답을 보내도록 설정하는 것이 자원을 절약할 수 있다. 이 방법은 Ajax 요청 헤더에 이전 요청 시간을 헤더로 포함해서 보내는 것으로 설정할 수 있다.  

Ajax 요청 취소
```
function abortRequest() {
    httpRequest.abort();
    document.getElementById("text").innerHTML = "Ajax 요청을 취소했습니다.";
}
```
`abort()`메소드를 사용하면 된다.  

### 문서 타입별 응답 처리
서버로부터의 응답 데이터 확인
- responseText 프로퍼티

서버에 요청하여 응답으로 받은 데이터를 문자열로 반환한다.
```
document.getElementById("text").innerHTML = xmlHttp.responseText;
```
텍스트 파일의 응답 처리
```
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
        // 텍스트 파일의 응답 처리는 responseText 프로퍼티를 사용해야 함.
        document.getElementById("text").innerHTML = httpRequest.responseText;
        // 텍스트 파일의 응답 처리에 responseXML 프로퍼티를 사용하면 null을 반환함.
        document.getElementById("xml").innerHTML = httpRequest.responseXML;
    }
};
httpRequest.open("GET", "/examples/media/ajax_doctype_text.php");
httpRequest.send();
```

- responseXML 프로퍼티

서버에 요청하여 응답으로 받은 데이터를 XML DOM 객체로 반환한다.
```
var httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
        // XML 문서의 응답 처리에 responseText 프로퍼티를 사용하면 XML 코드를 문자열로 반환함.
        document.getElementById("text").innerHTML = httpRequest.responseText;
        // XML 문서의 응답 처리는 responseXML 프로퍼티를 사용해야 함.
        document.getElementById("xml").innerHTML = httpRequest.responseXML;
    }
};
httpRequest.open("GET", "/examples/media/ajax_doctype_xml.php");
httpRequest.send();
```

XML 데이터의 응답 처리
서버로부터 XML 데이터를 응답으로 받은 경우에는 responseXML 프로퍼티를 사용하여 받은 데이터를 처리할 수 있다.
먼저 responseXML 프로퍼티를 사용하여 XML DOM 객체를 반환한 후에 해당 객체를 가지고 작업하면 된다.
```
var httpRequest, xmlData, result, i;
httpRequest = new XMLHttpRequest();
httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == XMLHttpRequest.DONE && httpRequest.status == 200 ) {
        xmlData = httpRequest.responseXML;
        document.getElementById("text").innerHTML =
            xmlData.getElementsByTagName("b")[0].firstChild.nodeValue;
            // XML 데이터의 첫 번째 <b>태그의 텍스트 노드의 값을 반환함.
    }
};
httpRequest.open("GET", "/examples/media/ajax_doctype_xml.php");
httpRequest.send();
```

---

- 2日  

BOJ 별 찍기 - 11을 통해서 프랙탈 구조를 재귀 형태로 구현하는 방법을 공부하였다. 제일 먼저 예제를 통해서 들어오는 값만큼 높이를 가진다는 것만 파악하고 나머지를 작은 삼각형을 통해서 큰 삼각형을 만들려는 생각이 들었지만 앞으로 나아가지 못했다. 다른 블로그의 포스팅으로 구조를 공부해서 풀어보았다.
```
void star(int n, int y, int x) {
	if (n == 3) {
		arr[y][x] = '*';
		arr[y+1][x-1] = '*';
		arr[y+1][x+1] = '*';
		arr[y+2][x-2] = '*';
		arr[y+2][x-1] = '*';
		arr[y+2][x] = '*';
		arr[y+2][x+1] = '*';
		arr[y+2][x+2] = '*';
		return;
	}
	
	star(n/2,y,x);
	star(n/2,y+(n/2),x-(n/2));
	star(n/2,y+(n/2),x+(n/2));
}

int main() {
	ios::sync_with_stdio(0);
	cin.tie(0);
	int n;
	cin >> n; 
	for (int i=0; i<n; i++) {
		for (int j=0; j<2*n; j++) {
			if (j == 2 * n - 1)
				arr[i][j] = '\0';
			else
				arr[i][j] = ' ';
		}
	}
	
	star(n, 0, n-1);
	
	for (int i=0; i<n; i++) {
		for (int j=0; j<2*n-1; j++) {
			cout << arr[i][j];
		}
		cout << '\n';
	}
}
```

큰 삼각형이 3개의 삼각형을 쪼개지고, 쪼개진 삼각형 안에 3개의 삼각형으로 쪼개지는 프랙탈 구조이므로 재귀함수를 이용해서 문제를 해결해야한다. 큰 삼각형 속에 윗 삼각형, 좌하단 삼각형, 우하단 삼각형 총 3개의 삼각형을 재귀적으로 호출해야한다.  
먼저 배열의 모든 값을 공백으로 하며, 행의 끝 부분만 null로 초기화한다. 별을 그릴 때는 삼각형 꼭대기부터 차례대로 그리기 때문에 star() 함수에 매개변수로 높이와 꼭대기 별의 좌표를 보내준다. 그리고 재귀 함수 속 기저조건으로는 높이가 3이 된 경우 별을 그리도록 한다.  
따라서 처음에는 높이를 n과 y,x 좌표로 (0,n-1)을 넘긴 다음 해당 삼각형을 그려주기 위해서  
```
  *
 * *
*****
```
별로 삼각형을 그려주며 위의 삼각형 높이와 맨 위 꼭대기 좌표로 재귀 1번, 좌하단의 삼각형의 높이와 맨 위 꼭대기 좌표로 재귀 1번, 우하단의 삼각형의 높이와 맨 위 곡대기 좌표로 재귀 1번. 총 3번의 재귀를 star() 함수에서 진행하며 해당 위치에서 높이가 3인 된 경우 출력을 한다.

---

- 3日  

## Vuepress [공식사이트](https://vuepress.vuejs.org/guide/)

### Quick Start
`yarn create vuepress [directoryName]`을 통해서 해당 원하는 디렉토리에서 vuepress을 생성한다.  

### Manual Setup
1) 새 디렉토리를 만들어서 그곳으로 이동한다.
`mkdir vuepress-starter && cd vuepress-starter`

2) 패키지 매니저를 초기화한다.
`yarn init # npm init`

3) VuePress을 설치한다.
`yarn add -D vuepress # npm install -D vuepress`

4) docs 경로를 만든 다음 README.md 마크다운을 만들어서 입력한다.
`mkdir docs && echo '# Hello VuePress' > docs/README.md`

5) package.json에 Script에 아래와 같이 입력하여 yarn으로 VuePress을 빌드하고 개발을 위해 로컬로 킬 수 있게 한다.
```
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

6) 로컬 서버로 열어 개발을 한다.
`yarn docs:dev # npm run docs:dev`

그 이후로는 정적 페이지를 만들 수 있게 되었다.  

`.vuepress/config.js`에서 자바스크립트 외부로 모듈을 export 할 수 있다. 따라서 아래와 같이 기입하게 되면 build을 할 때 해당 내용이 html으로 변환되어 build 폴더에 생기게 된다. 그 값이 index.html으로 남게 된다.
```
module.exports = {
  title: 'Hello VuePress',
  description: 'Just playing around'
}
```
이 외에도 `base`로 base url을 지정하거나 `themeConfig`을 통해서 `sidebar`와 `nav`을 만들어서 ui를 구축할 수 있다. 먼저 `nav`는 맨 위 상단 바에 유지되는 내용이고, `sidebar`의 경우에는 왼쪽에 메뉴로 값들을 유지할 수 있다.  
나의 경우에는 `.vuepress/components`에 Home.vue로 index.html을 바꾸게 했으며 그렇기 위해서 루트 디렉토리의 Readme.md를 home.vue으로 잡아줬다. 이후에는 `.vuepress/` 경로에 폴더로 나눠서 마크다운 형식의 파일로 모두 표기하며  
```
---
sidebar : auto
---
```
을 통해서 자동으로 `#, ##, ###`을 h1, h2, h3으로 자동으로 매칭해주며, 왼쪽 사이드바에 나오게 된다.  

---

- 4日  

이분탐색 알고리즘을 공부했다. 이분 탐색 알고리즘은 말 그대로 두 가지로 쪼개서 탐색한다는 것이다. 오름차순으로 정렬된 리스트에서 특정한 값의 위치를 찾는 알고리즘으로, 처음 중간의 값을 임의의 값으로 선택하여, 그 값과 찾고자 하는 값의 크고 작음을 비교하는 방식이다.  
이분 탐색 알고리즘을 얘기하면 같이 나오는 알고리즘이 있다. 바로 파라메트릭 탐색​이다.  

두 탐색의 공통점을 먼저 살펴보자  
- 정렬된 상태여야 한다
- 구간을 반절로 나누어 탐색

이분탐색
- 내가 찾고자 하는 답을 구함
- 답이 연속된 데이터에 들어있는지 확인 수단으로만 쓰임

파라메트릭 탐색
- 찾고자하는 답의 가능한 범위(min,Max)를 구함
- 어떤 조건을 적용해 최적화 문제를 결정 문제(참/거짓)로 바꾸어 푸는 알고리즘

파라메트릭 탐색 조건
- 최대값 M을 구하는 문제의 경우, M이 어떤 조건 c를 만족하면 M보다 작은 값도 모두 조건 c를 만족해야 함
- 최소값 m을 구하는 문제의 경우, m이 어떤 조건 c를 만족하면 m보다 큰 값도 모두 조건 c를 만족해야 함
- 이산적인 범위

문제는 대표적으로 2가지를 살펴볼 것이다.  

1. 합이 0인 네 정수 
배열 A B C D의 원소 합이 0이 되는 쌍의 개수 찾기
```
7453. 합이 0인 네 정수
for (int i=0; i<n; i++) {
		for (int j=0; j<n; j++) {
			v.push_back(arr[2][i] + arr[3][j]);
		}
	}
	
	sort(v.begin(),v.end());
	
	
	long long ans = 0;
	
	for (int i=0; i<n; i++) {
		for (int j=0; j<n; j++) {
			long long ab = arr[0][i] + arr[1][j];
			
			long long first = lower_bound(v.begin(),v.end(), -ab) - v.begin();
			long long last = upper_bound(v.begin(),v.end(), -ab) - v.begin();
			
			if(v[first] == -ab) {
				ans += (last - first);
			}
		}
	}
```
O(n⁴)의 시간복잡도로 풀 수 없으니, 먼저 배열 4개를 2개로 줄인다. AB와 CD로 나누기 위해 벡터 하나를 가지고 CD을 합친다. 그 후 벡터를 정렬하고 AB배열의 합이 CD배열의 합의 음의 값과 같은 경우를 찾았다. 이 때, 같은 값을 가진 원소가 많을 수 있으므로 `lower_bound`와 `upper_bound`을 통해서 원소의 갯수를 다 찾았다.  

이 문제를 풀면서 가장 걸렸던 것은 시간이였다. 해당 문제의 제한 시간은 2초지만, 내가 알기로 산술연산이 1억번당 1초라고 알고 있었기 때문에 배열을 만들 때 쓰인 1600만번과 1600만 원소 정렬, lower_bound와 upper_bound로 인한 log₂(1600만) = 23.9xxx로 1억번당 1초로 계산하게되면 총 3.6초 정도 걸리게되므로 시간제한에 걸린다.  
하지만 해당 소스는 통과가 되므로 이 점이 가장 의아했다. 찾아본 결과 1억당 1초라는 얘기는 오래된 얘기이며, 해당 코드가 기계어 단위로 몇 개의 명령어로 환산되는지 알기 어렵고 캐시 미스 등 성능에 영향을 줄 수 있는 요소가 많다. 따라서 시간 복잡도는 점근적으로만 나타낼 뿐 정확한 연산의 개수를 구해주는 장치가 아니므로 참고사항일 뿐 정밀하게 시간을 계산할 수 없다. 라는 답변을 읽어볼 수 있었다.

2. 도토리 숨기기  
상자의 개수 N, 규칙의 개수 K, 도토리의 개수 D가 주어지고 규칙이 K만큼 주어지는데 규칙은 A상자 ~ B상자까지 C개 간격으로 도토리를 하나씩 넣는 규칙을 얘기한다.
```
15732. 도토리 숨기기
while (left <= right) {
		int mid = (left + right) / 2;
		
		long long sum = 0;
		for (int i=0; i<k; i++) {
			int high = min(v[i].first.second, mid);
			if(high >= v[i].first.first) {
				sum += ((high - v[i].first.first) / v[i].second) + 1;
			}
		}
		if(sum >= d) {
			ans = mid;
			right = mid - 1;
		}
		else {
			left = mid + 1;
		}
	}
```
이 문제는 먼저 이분탐색이라는 것을 알 기 어려웠고, 조건을 무엇으로 할지가 가장 어려웠다. 왜냐하면 K개의 규칙 때문에 무엇을 잡아야하는지 상당히 혼동스러웠기 때문이다.  

상자번호를 기준으로 잡고 주어진 규칙의 B상자번호와 기준값을 비교해서 작은 값보다 A상자번호가 같거나 작은 경우에 해당 값과 A상자번호 값을 뺀 후 C개로 나누어준 뒤 0번째도 도토리를 넣으므로 1을 더해주게 된다. 이렇게 하면 해당 기준 값일 때의 i번째 규칙의 도토리 갯수를 셀 수 있게된다. 해당 도토리 갯수를 전부 다 더한 다음 주어진 도토리 갯수를 조건으로 둬서 이분탐색을 하면 된다.  

---

- 5日  

PS을 하면서 막힌 부분과 기억해야 하는 부분을 기록해볼 것이다.  

18119. 단어 암기  
처음에 모든 알파벳을 기억하고 있되, 밑의 연산에 따라서 잊거나 기억할 수 있다. 이 때의 주어진 단어를 몇 개 기억하는지 출력하라.
```
vector<bitset<26>> check;
vector<bitset<26>> copy_check;
if(cmd == 1) {
	for (int j=0; j<n; j++) {
		if(copy_check[j][x - 'a'] == true)
			check[j][x - 'a'] = false;
	}
}
	
else {
	for (int j=0; j<n; j++) {
		if(copy_check[j][x - 'a'] == true)
			check[j][x - 'a'] = true;
	}
}
	
for (int j=0; j<n; j++) {
	if(copy_check[j] == check[j]) cnt++;
}
cout << cnt << '\n';
```
bitset을 알파벳 수인 26개로 잡아놓고 문자열마다 해당 알파벳 부분을 true로 잡아놓은다. 그리고 그 bitset벡터를 복사한 뒤 연산에서 해당 알파벳이 나온다면 복사된 벡터에 존재한다면 그 알파벳을 true 혹은 false로 조정해준다. 이렇게 하여 bitset을 전체 비교해서 같은 카운트를 세준다.  

10830. 행렬 제곱  
최대 5x5 행렬을 최대 천억만큼 거듭 제곱한 결과를 구해야한다.  
```
vector<vector<ll>> power(vector<vector<ll>> mat, ll num) {
	vector<vector<ll>> ret(n, vector<ll>(n));
	for (int i=0; i<n; i++) {
		ret[i][i] = 1;
	} 
	
	while(num > 0) {
		if (num % 2) {
			ret = mul(ret, mat);
		}
		num /= 2;
		mat = mul(mat, mat);
	}
	return ret;
}
```
핵심 함수는 다음과 같다. 분할 정복의 거듭 제곱과 비슷하게 하되, 그것을 행렬로 하면 된다는 생각을 하였다. 따라서 단위행렬을 만들고 횟수가 홀수, 짝수를 나눠서 시도하되, 행렬의 곱을 만들어주기 위해 함수로 구현을 하였다. 행렬의 곱셈도 함수로 구현하여 답을 구했다.

---

- 6日  

이분 탐색 정리  

이분 탐색은 오름차순으로 정렬된 리스트에서 특정한 값의 위치를 찾는 알고리즘이다. 처음 중간의 값을 임의의 값으로 선택하여, 그 값과 찾고자 하는 값의 크고 작음을 비교하는 방식을 채택하고 있다. 처음 선택한 중앙값이 만약 찾는 값보다 크면 그 값은 새로운 최고값이 되며, 작으면 그 값은 새로운 최하값이 된다. 검색 원리상 정렬된 리스트에만 사용할 수 있다는 단점이 있지만, 검색이 반복될 때마다 목표값을 찾을 확률은 두 배가 되므로 속도가 빠르다는 장점이 있다. 이분 탐색은 분할 정복 알고리즘의 한 예이다.

이분 탐색의 과정

1. 배열의 중간을 먼저 탐색한다.
2. 중간값이 탐색값이면 중단.
3. 중간값이 탐색값이 아니라면 중간값과 탐색값의 크기를 비교한다.
4. 중간값 > 탐색값 - 중간값의 오른쪽 인덱스들은 제외
5. 중간값 < 탐색값 - 중간값의 왼쪽 인덱스들은 제외

데이터가 정렬되어 있으면 위의 과정을 반복해서 절반씩 나눠서 걸러낸다.

STL algorithm에서 `upper_bound`와 `lower_bound`함수를 살펴보면 이분탐색을 기반으로 한 탐색 방법이다. 이분탐색이므로, 배열이나 리스트가 정렬이 되어 있어야 한다. `lower_bound`의 결과는 key값이 없으면 key값보다 큰 가장 작은 정수 값을 찾는다. 같은 원소가 여러 개 있어도 상관 없으며, 항상 유일한 해를 구할 수 있다. 예를 들어 `[begin, end]` 배열이 있을 때, 중간위치의 인덱스를 mid라고 하면 `arr[mid] < key` 이면서 `arr[mid] >= key`인 최소의 m 값을 찾으면 된다. `upper_bound`는 반대로 생각하면 된다.  

반환형은 Iterator이므로 vector를 사용하게 되면 벡터의 begin()을 빼게 되면 인자의 순서를 구할 수 있고, 배열이라면 첫 번쨰 주소를 빼면 인자의 순서를 알 수 있다.  

시간 복잡도는 O(log(last - first))으로, 전체 원소 개수에 로그에 비례한다.  

LCS 알고리즘

LCS는 두 가지로 나뉘어진다. 

`최장 공통 부분 문자열(Longest Common Substring)`과 `최장 공통 부분 수열(Longest Common Subsequence)` 두 가지로 나뉘는데 비슷하나 차이점이 뚜렷하다. 그 차이점은 해당 부분의 연속 여부이다. 아래 예시를 봐보자.  

A**BCD**FEF  A**BCD**F**EF**  
**BCD**EF	 **BCDEF**  

해당 두 개의 문자열이 있다고 가정해보자. 먼저, 최장 공통 부분 문자열의 경우에는 `BCD` 3개를 갖고, 최장 공통 부분 수열의 경우에는 `BCDEF` 5개를 갖게 된다.  

최장 공통 부분 문자열  
![LCS](https://wikimedia.org/api/rest_v1/media/math/render/svg/83ccdb67e41ba0b5043a8eb2a67ca0d7a6908ad2)


```
for (int i=1; i<=A.length; i++) {
	for (int j=1; j<=B.length; j++) {
		if(A[i-1] == B[j-1]) {
			LCS[i][j] = LCS[i-1][j-1]+1
			if(ans < LCS[i][j])
				ans = LCS[i][j]
		}
	}
}
```

최장 공통 부분 수열  
![LCS2](https://wikimedia.org/api/rest_v1/media/math/render/svg/a40feb09ada8db5fb1fb6fe0c31b2ee25b7c9835)  
X와 Y는 비교할 각 문자열, i와 j는 문자열의 각 인덱스이다. 구현에 있어 3가지가 필요하다.

1. 처음엔 편의를 위해서 빈 수열로 채워준다.  
          
|   | 0 | A | G | C | A | T |
|---|---|---|---|---|---|---|
| 0 | Ø | Ø | Ø | Ø | Ø | Ø |
| G | Ø |   |   |   |   |   |
| A | Ø |   |   |   |   |   |
| C | Ø |   |   |   |   |   |

2. X와 Y의 문자가 같은 경우이다. 이때 예시를 보자.  
```
stirng a = "ABCD"
string b = "AEBD"
LCS("ABCD", "AEBD") = 1 + LCS("ABC", "AEB")
```
`(ABCD와 AEBD의 길이) = (ABC, AEB를 비교했을 때의 길이 + 1)`

3. X와 Y의 문자가 다를 경우
```
LCS("ABC", "AEB") = MAX(LCS("AB", "AEB"), LCS("ABC", "AE"))
```
(AB, AEB 길이)와 (ABC,AE 길이) 중 큰 값을 (ABC, AEB 길이)에 대입한다.  

이러한 3가지를 코드로 나타내면
```
for(int i=1;i<=A.length;i++) { 
	for(int j=1;j<=B.length;j++) { 
		if (A[i-1] == B[j-1]) { 
			LCS[i][j] = LCS[i-1][j-1] + 1; 
		} 
		else { 
			LCS[i][j] = Math.max(LCS[i][j-1], LCS[i-1][j]); 
		}
	}
}
```

두 문자열의 각 문자를 비교하지 않고 선행 문자를 끼고 문자열로써 비교를 하는 것이다. 따라서 LCS 배열 마지막에는 LCS의 길이를 볼 수 있게 된다.  

추가적으로, LCS에 해당하는 부분 수열을 알고 싶다면 표로 생각해보자. LCS에서 DP와 같이 전의 값을 이용해서 값을 찾아낸다. 이 때 값이 변하는 구간은 항상 대각선으로 변하게 된다. 따라서, 대각선인 시점을 체크해서 그 전까지는 같은 수열을 갖다가 대각선 이후로 수열이 바뀌는 것을 볼 수 있다. 이것을 코드로 봐보자.

```
for (int i = 1; i <= A.length; i++) {
    for (int j = 1; j <= B.length; j++) {
        if (A[i - 1] == B[j - 1]) {
            LCS[i][j] = LCS[i - 1][j - 1] + 1;
            solution[i][j] = "diagonal";
        }
		else {
            LCS[i][j] = Math.max(LCS[i][j - 1], LCS[i - 1][j]);

            if (LCS[i][j] == LCS[i - 1][j]) 
                solution[i][j] = "top";
            else 
                solution[i][j] = "left";
            
        }
    }
}

int a = A.length;
int b = B.length;

while(solution[a][b] != null) {
    if (solution[a][b] == "diagonal") {
        sb.append(A[a-1]);
        a--;
        b--;
	}
    else if (solution[a][b] == "top") 
        a--;
    else if (solution[a][b] == "left") 
        b--;
}
sb.reverse.toString(); // 최장 공통 부분 수열 리스트
```

여기서 여러 개의 문자열을 비교할려면 배열을 늘려주자.

---

- 7日  

어제 공부하고 정리한 LCS을 토대로 LCS 문제를 풀어보았다.  

5582. 공통 부분 문자열
```
for (int i=1; i<=asize; i++) {
	for (int j=1; j<=bsize; j++) {
		if(a[i-1] == b[j-1]) {
			dp[i][j] = dp[i-1][j-1] + 1;
		}
		ans = max(ans,dp[i][j]);
	}
}
```
문자 하나하나를 비교하며 같은 경우 dp의 이전 대각선 방향의 값을 1을 더하는 연산을 반복해서 공통 부분 문자열의 갯수를 세주었다.  

15482. 한글 LCS  
```
#include <bits/stdc++.h>
using namespace std;

char str1[3027];
char str2[3027];
int board[1005][1005];

bool check(int i, int j) {
	if (str1[i * 3] == str2[j * 3] && str1[i * 3 + 1] == str2[j * 3 + 1] && str1[i * 3 + 2] == str2[j * 3 + 2]) return true;
	return false;
}

int main() {
	scanf("%s %s", str1, str2);
	int len1 = strlen(str1) / 3;
	int len2 = strlen(str2) / 3;
	for (int i = 1; i <= len1; i++) {
		for (int j = 1; j <= len2; j++) {
			if (check(i - 1, j - 1)) board[i][j] = board[i - 1][j - 1] + 1;
			else board[i][j] = max(board[i - 1][j], board[i][j - 1]);
		}
	}
	printf("%d", board[len1][len2]);
	return 0;
}
```
이 문제의 경우에는 전체 소스를 보아야한다. 왜냐 하면 다른 소스를 참고했기 때문이다. 먼저 영문을 사용하듯이 LCS을 사용했는데 내 컴파일러 환경에서는 한글을 2byte로 세서 크기가 2배 정도 늘어나 있었다. 따라서 알고리즘을 다 돌린 후 마지막에 2를 나눠서 구하면 테스트 케이스 값이 전부 정확히 나와서 제출을 했으나 계속 오답이였다. 따라서 계속 해보다가 질문을 찾아보니 BOJ상에서는 유니코드로 3byte를 차지한다는 것을 알게되어 같은 코드에서 3배로 했으나 답이 계속 안 나와서 해당 질문자의 코드를 조금 고쳐서 사용해보았다. C로 짠 코드와 C++로 짠 코드에서 한글의 byte 차이가 나는지 궁금하다.  

9252. LCS 2, 1958 LCS 3  
```
for (int i=1; i<=n; i++) {
	for (int j=1; j<=m; j++) {
		if(a[i-1] == b[j-1])  {
			dp[i][j] = dp[i-1][j-1] + 1;
			LCS[i][j] += LCS[i-1][j-1] + a[i-1];
		}
		else  {
			dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
			if(dp[i][j] == dp[i-1][j])
				LCS[i][j] = LCS[i-1][j];
			else
				LCS[i][j] = LCS[i][j-1];
		}
	}
}
-------------------------------------------
for (int i=1; i<=asize; i++) {
	for (int j=1; j<=bsize; j++) {
		for (int k=1; k<=csize; k++) {
			if(a[i-1] == b[j-1] && b[j-1] == c[k-1])
				dp[i][j][k] = dp[i-1][j-1][k-1] + 1;
			else {
				dp[i][j][k] = max(max(dp[i-1][j][k], dp[i][j-1][k]), dp[i][j][k-1]);
			}
		}
	}
}
```
LCS 2의 경우에는 LCS의 수열을 보여주는 것이고 LCS 3의 경우에는 문자열이 늘어났을 경우이다. 이 때 LCS의 수열을 보여주는 것은 어제 공부 했던거와 같이 할려했으나 코드를 작성 중에 포문 속에 같이 찾게 되면 시간을 더 줄일 수 있을 거 같아서 만약 찾게 되면 똑같이 대각선의 수열을 뒤에 붙이지만 찾지 못한 경우 해당 내용에서 DP 배열의 값을 비교해서 더 큰 쪽이 LCS가 진행 중이므로 해당 좌표의 LCS을 현재 좌표에 넣어주었다.  

문자열이 늘어난 LCS3의 경우에는 똑같이 삼중포문을 써서 배열 하나를 늘려, 다 같은 경우와 아닌 경우를 나눠서 똑같이 LCS의 수를 구해주었다.  

---  

- 8日  

## Express  

Node.js를 위한 빠르고 개방적인 간결한 웹 프레임워크  

```
$ npm install express-generator -g
```

해당 명령어를 통해 express을 설치할 수 있다. 이 때의 node.js가 설치되어 있다고 가정하고 진행하는 것이다.  

```
$ express --view=pug 디렉토리 이름
```

express 앱을 원하는 디렉토리로 작성한다.

```
npm install
> set DEBUG=디렉토리 이름:* & npm start
```
해당 디렉토리로 이동 후 npm을 설치하고 Debug 설정 후 npm start을 통해서 localhost:3000에 앱에 액세스할 수 있게 된다.  

### 라우팅  

라우팅이라는 개념이 등장하는데 이것은 URI 및 특정한 HTTP 요청 메소드인 특정 엔드포인트에 대한 클라이언트 요청에 애플리케이션이 응답하는 방법을 결정하는 것이다. 이 때 각 라우트는 하나 이상의 핸들러 함수를 가질 수 있으며, 라우트 경로가 일치할 때 실행이 된다. 라우트 경로는 문자열, 문자열 패턴 또는 정규식일 수 있다.

라우트의 구조  

```
app.METHOD(PATH, HANDLER)
```

- app : express의 인스턴스
- METHOD : HTTP 요청 메소드 (대표적으로 GET, POST, PUT, DELETE 등. 과 모든 요청 메소드를 뜻하는 `all`)
- PATH : 서버의 경로
- HANDLER : 라우트가 일치될 때 실행하는 함수

예시를 통해 이해해보자.
```
app.get('/', function (req, res) {
	res.send('Hello Wolrd!');
});
```
이 예시는 홈페이지에서 Hello World!로 응답하는 코드이다.  

이어서 봐보면
```
app.post('/', function(req, res) {
	res.send('Got a POST request');
});
```
애플리케이션의 루트 라우트(`'/'`)에서 POST 요청에 응답하는 코드이다.  

```
app.put('/user', function(req, res) {
	res.send('Got a PUT request at /user');
});
```
마찬 가지로 /user 라우트에 대한 PUT 요청의 응답이다.

```
app.delete('/user', fucntion (req, res) {
	res.send('Got a DELETE request at /user');
});
```
마지막으로 같은 예제로 /user 라우트에 대한 DELETE 요청에 응답하는 코드이다.  

라우트 핸들러  

라우트 경로가 일치될 때 실행되는 함수로 미들웨어와 비슷하게 작동하는 여러 콜백 함수를 제공하여 요청을 처리할 수 있다. 차이점은 `next('route')`을 호출하여 나머지 라우트 콜백을 우회할 수 있다. 이것은 라우트에 대한 조건을 지정 후, 현재의 라우트를 계속할 필요 없을 경우 후속 라우트에 제어를 전달할 수 있다.  

예시와 함께 설명을 보자.  
```
app.get('/example/a, function(req, res) {
	res.send('Hello from A!');
});
```
하나의 콜백 함수는 하나의 라우트를 처리할 수 있다.  

```
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```
2개 이상의 콜백 함수도 하나의 라우트로 처리할 수 있다. 이 때 무조건 `next` 오브젝트를 지정해주어야 한다.

```
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
```

하나의 콜백 함수 배열은 하나의 라우트를 처리할 수 있다. 따라서 경로를 지정해준 뒤 배열로 핸들러를 지정해줄 수 있다.

```
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
```
위에서 이야기한 내용들을 섞어서도 가능하다. 무슨 말이냐면, 독립적인 함수와 함수 배열의 조합으로 하나의 라우트를 처리할 수 있다.

응답 메소드
응답 오브젝트(`res`)에 대한 메소드는 응답을 클라이언트로 전송하고 요청-응답 주기를 종료할 수 있다. 따라서 라우트 핸들러에서 해당 메소드 중 하나도 호출되지 않는다면 클아이언트 요청은 정지된채로 방치되게 된다.
| 메소드 | 설명 |
|-------|-------|
| res.download() | 파일이 다운로드 되도록 프롬프트 |
| res.end() | 응답 프로세스를 종료 |
| res.json() | JSON 응답을 전송 |
| res.jsonp() | JSNOP 지원을 통해 JSON 응답 전송 |
| res.redirect() | 요청의 경로를 재지정 |
| res.render() | 보기 템플릿을 렌더링 |
| res.send() | 다양한 유형의 응답 전송 |
| res.sendFile | 파일을 옥텟 스트림의 형태로 전송 |
| res.sendStatus() | 응답 상태 코드를 설정 후 해당 코드를 문자열로 표현한 내용을 응답 본문 전송 |

**app.route()**  

라우트 경로에 대하여 체인 가능한 라우트 핸들러를 작성할 수 있다. 경로가 같으므로 모듈식 라우틀르 작성하면 가독성이 증가하며 편리하게 코딩을 할 수 있다.
```
app.route('/book')
	.get(function(req, res) {
		res.send('Get a random book');
	})
	.post(function(req, res) {
		res.send('Add a book');
	})
	.put(function(req, res) {
		res.send('Update the book');
	});
```

**express.Router**

`app.route()`와 비슷하게 `express.Router` 클래스를 사용하여 모듈식 마운팅 가능한 핸들러를 작성할 수 있다. Router 인스턴스는 완전한 미들웨어이자, 라우팅 시스템으로 미니 앱(mini-app)이라고 불리기도 한다.  

```
// bird.js

var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', function(req, res) {
  res.send('Birds home page');
});

// define the about route
router.get('/about', function(req, res) {
  res.send('About birds');
});

module.exports = router;

// app.js
var birds = require('./birds');
...
app.use('/birds', birds);
```
이러하게 라우터를 모듈로 작성하고, 미들웨어 함수를 로드하고 다른 라우트들을 정의한 뒤 기본 앱의 한 경로에 라우터 모듈을 마운트한다. 그 뒤 앱 내에서 라우터 모듈을 로드 하게 되면 라우터에서 정의해놓은 라우트들의 요청을 처리할 수 있으며, 미들웨어 함수를 호출할 수 있게 된다.  



### 정적 파일 이용

이미지나, CSS 파일 및 JavaScript와 같은 정적 파일을 제공하려면 Express의 기본 제공 미들웨어 함수인 `express static`을 이용하여야 한다.  

정적 자산이 포함된 디렉토리의 이름을 `express.static` 미들웨어 함수에 전닳하면 파일의 직접적인 제공이 가능하다.  

```
app.use(express.static('public'));
```
위와 같은 코드를 이용하면 public 디렉토리에 있는 정적 파일을 제공할 수 있다.  
따라서 다음과 같이 접근을 하게되면 해당 정적 파일을 그대로 접근할 수 있게 된다.
```
localhost:3000/img/cat.jpg
localhost:3000/css/style.css
localhost:3000/js/app.js
localhost:3000/index.html
```

여러 개의 디렉토리를 정적 파일이 있는 디렉토리로 등록을 할 수 있는데 해당 문법을 그대로 사용하면 된다.
```
app.use(express.static('public'))
app.use(express.static('files'))
```

이렇게 사용하면 되나, `express.static`을 설정한 순서대로 파일을 검색한다. 따라서 같은 이름의 파일이 존재한다면 먼저 설정한 파일을 찾는다는 말이 된다.  

또, 정적 파일을 접근 시에 가상 경로를 만들어서 파일에 접근하게 하고 싶다면 위와 같은 문법을 사용하면 된다.  
```
app.use('/static', express.static('public'));
```

```
localhost:3000/static/img/cat.jpg
localhost:3000/static/css/style.css
localhost:3000/static/js/app.js
localhost:3000/static/index.html
```

`express.static` 함수에 제공되는 경로는 node 프로세스가 실행되는 디렉토리에 상대적이므로 다른 디렉토리에서 express 앱을 실행하는 경우에는 절대 경로로 주어지는 것이 안정성을 높일 수 있다.

### 미들웨어  

미들웨어함수는 요청 오브젝트(`req`), 응답 오브젝트(`res`), 그리고 애플레키에션의 요청-응답 주기 중 그 다음의 미들웨어 함수에 대한 액세스 권한을 갖는 함수이다. 미들웨어 함수는 일반적으로 `next`라는 이름의 변수로 표시된다.  

- 모든 코드를 실행
- 요청 및 응답 오브젝트에 대한 변경을 실행
- 요청-응답 주기를 종료
- 스택 내의 그 다음 미들웨어를 호출

미들웨어 함수는 이러한 작업을 수행할 수 있다.

현재의 미들웨어 함수가 요청-응답 주기를 종료하지 않았다면 `next()`을 호출하여 그 다음 미들웨어 함수에 제어를 전달해야한다. 그렇지 않으면 해당 요청은 정지된 채 방치된다.  

![Express 폼](https://expressjs.com/images/express-mw.png)  
express 공식홈페이지의 사진 설명  

사진을 통해서 미들웨어 함수 호출의 요소에 대해 알아 볼 수 있다.
- `get` : HTTP 메소드
- `'/'` : 라우트
- `function` : 함수
- `req` : HTTP 요청 인수
- `res` : HTTP 응답 인수
- `next` : 콜백 인수

예시로 두 개의 미들함수를 정의한 간단한 코드를 살펴보자.
```
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
```
루트 경로의 GET 요청을 받고 응답을 `Hello World!`로 보내는 함수를 정의했다.  

미들웨어함수를 정의하고 사용하는 방법을 짧게 예제를 통해 봐보자

```
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
```
이렇게 짜게되면 앱이 요청을 수신할 때마다 "LOGGED"라는 메세지를 터미널에 출력하게 된다. 이때의 미들웨어의 로드 순서는 중요하며, 먼저 로드된 순서대로 실행이 되게된다. 만약 루트 경로에 대한 라우팅 이후에 `MyLogger`가 로드되면, 루트 경로의 라우트 핸들러가 요청-응답 주기를 종료하므로 `MyLogger`에 닿지 못해서 실행이 될 일이 없게 된다.  
그와 달리 `MyLogger` 미들웨어 함수는 메시지를 출력 후 `next()` 함수를 호출하여 스택 내의 그 다음 미들웨어 함수에게 요청을 전달한다. 따라서 루트 경로에 라우팅을 할 수 있게 된다.  

그러므로 라우트를 정의하고 사용할 때에 순서를 유념하고 사용해야 원하는 개발을 할 수 있을 것이다.

마지막으로 여러 유형의 미들웨어를 살펴본다.

- 애플리케이션 레벨 미들웨어
- 라우터 레벨 미들웨어
- 오류 처리 미들웨어
- 기본 제공 미들웨어
- 써드파티 미들웨어

이러한 종류가 존재하나, 위의 3가지 미들웨어를 살펴볼 것이다. 개발할 때 직접적으로 사용했던 미들웨어이였기 때문이다.  

애플리케이션 레벨 미들웨어  

`app.use()`나 `app.METHOD()` 함수를 이용할 수 있는 애플리케이션 레벨에 존재하는 미들웨어를 뜻하며, 이 미들웨어 함수는 일련의 미들웨어 함수를 함께 로드 할 수 있으며, 하나의 마운트 위치에 미들웨어 시스템의 하위 스택을 작성할 수 있다.  

예제로 살펴보자.  
```
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});
```
지금까지 자주 보았던 미들웨어로, 마운트 경로가 없는 미들웨어 함수이다. 이 함수는 앱이 요청을 수신할 때마다 실행하게 된다.  

```
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```
이 예시는 `/user/:id` 경로에 마운트 되는 미들웨어 함수이다. 이 함수는 모든 유형의 HTTP 요청에 대해 실행이 된다.

```
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});
```
라우트 및 해당 라우트의 핸들러 함수로, `/user/:id`경로의 GET 요청을 처리한다.

```
app.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});
```
라우터 핸들러를 이용하면 하나의 경로에 대해 여러 라우트를 정의할 수 있다. 해당 /user/:id 경로에 대한 GET 요청에 대해 2개의 라우트를 정의하나, 첫 번째 라우트가 요청-응답 주기를 종료시키므로 두 번째 라우트는 호출되지 않는다.

```
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id);
});
```
경로에 대한 GET 요청을 처리하는 미들웨어 하위 스택을 표시하는 예제로, 라우터 미들웨어 스택의 나머지 미들웨어 함수들을 건너뛰려면 `next('route')`을 호출하여 제어를 그 다음 라우트로 전달해야한다. 이 때 `next('route')`는 app.METHOD()나 router.METHOD() 함수를 이용해 로드된 미들웨어 함수에서만 작동된다.  

```
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
```
마지막으로 미들웨어 하위 스택으로 넘어가는 예제를 보여주며 이러한 코딩도 가능하다는 것을 보여준다.

### 라우터 레벨 미들웨어
라우터 레벨 미들웨어는 `express.Router()` 인스턴스에 바인드된다는 점을 제외하면 애플레키에션 레벨 미들웨어와 동일한 방식으로 작동한다.
```
var app = express();
var router = express.Router();

// a middleware function with no mount path. This code is executed for every request to the router
router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// a middleware sub-stack shows request info for any type of HTTP request to the /user/:id path
router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next router
  if (req.params.id == 0) next('route');
  // otherwise pass control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});

// handler for the /user/:id path, which renders a special page
router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});

// mount the router on the app
app.use('/', router);
```
지금까지의 애플리케이션 레벨 미들웨어에서 사용된 함수들을 router 레벨에서 돌릴 수 있게 변경한 예제이다. 그리고 마지막에 app이 존재하는 app.js와 같은 파일에서 `app.use('path', router)`을 명시해서 마운트를 해줘야한다.  

### 오류 처리 미들웨어
다른 미들웨어 함수와 동일한 방법으로 정의할 수 있지만 오류 처리 함수는 인수를 3개가 아닌 4개(err, req, res, next)를 가지므로 분류가 새롭게 된다고 생각하면 된다.
```
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

---

- 9日  

## LIS
LIS(Longest Increasing Subsequence) : 최장 증가 부분 수열  

수열 하나가 주어졌을 때, 가장 긴 증가하는 부분 수열을 구할 때 3가지 방법이 있다.

- 완전 탐색을 이용한 방법(O(2ⁿ))
- DP를 이용한 방법 (O(n²))
- 이진 탐색을 이용한 방법 (O(n logn))

### 완전탐색을 이용한 방법
완전 탐색의 경우에는 하나하나 다 비교해보면 되므로 모든 증가 부분수열을 고려한다. 배열을 받아서 원 배열에서 증가 부분 수열의 첫번째 수를 선택한 뒤, 다음 수의 조건(첫 수보다 원 배열에서 뒤에 있고 큰 후보)에 해당하는 값들의 배열을 꾸려 재귀를 해나가면 될 것 같다.  

어떤 수가 나올지는 상관없이 자신보다 작은 숫자인지 확인하고 이전 값에서 1을 계속 더해가면 해당 LCS의 길이를 구할 수 있다.

### DP를 이용한 방법
DP를 이용한 방법은 아래와 같이 알고리즘을 짜볼 수 있다.  
1. 수열의 길이와 같은 dp배열을 하나 선언한다. 

2. 수열을 처음부터 끝까지 순서대로 1개씩 탐색한다. ( 현재 위치 = i )
  	1. dp[i]에 넣을 값을 초기화해준다. (val)

  	2. 현재 위치(i)보다 이전에 있는 원소(j) 중에서 현재 원소보다 작은지 체크한다. (크거나 같으면 LIS 불가능)

  	3. 현재 원소보다 작다면, dp[j]가 val 보다 큰지 체크한다. 이 때 val보다 크다면 j번째 원소를 포함했을 때가, 지금까지 확인한 최장 증가 부분 수열보다 더 길다는 의미이므로 val에 dp[j]를 할당해준다. 

  	4. 현재 원소도 포함해주어야 하므로 최종적으로 dp[i]에 val + 1을 할당해준다.
3. dp배열의 원소 중에서 가장 큰 값을 출력한다.  

```
for(int i=1;i<N;i++) {
	for(int j=0;j<i;j++) { 
		if (array[i] > array[j] && dp[j] + 1 > dp[i])
			 dp[i] = dp[j] + 1; // 증가 수열
	}
	if (max < dp[i])
		max = dp[i]; 
	
}
```
처음에 dp 배열의 값들을 1로 초기화 해주어야하며, if문의 조건에 `dp[j] + 1 > dp[i]`가 들어간 이유는 예를 들어서 10 20 30 20 인 경우 값이 20을 만나게 되면 값이 줄어드는 것을 볼 수 있다. 이 부분을 보장해주기 위해 해당 조건을 추가한 것이다.  

### 이진 탐색을 이용한 방법

해당 부분은 잘 정리된 블로그 포스팅을 참고해서 썼다.

- 배열 마지막 요소보다 새로운 수가 크다면, 배열에 넣는다.
- 그렇지 않다면, 그 수가 들어갈 자리에 넣는다. (이분 탐색을 통해 들어갈 자리를 찾는다)

LIS의 갯수만 구할 때의 가장 이해하기 쉬운 코드를 찾아보았다.  
```
dp[0] = array[0];
int idx = 0;
for (int i = 1; i < n; i++) {
	if (dp[idx] < array[i]) { 
		dp[++idx] = array[i]; 
	}
	else {
		int ii = lower_bound(array.begin(), array.end(), idx);
		dp[ii] = array[i];
	} 
}
// ans => idx + 1
```

혹은 이런 방식으로 짧게 구현하는 방법도 있다
```
for (int i=0; i<n; i++) {
	vector<int>::iterator iter = lower_bound(dp.begin(), dp.end(), arr[i]);
	if(iter == dp.end()) dp.push_back(arr[i]);
	else *iter = arr[i];
}
cout << dp.size();
```
`lower_bound`을 통해서 못 찾으면 push_back, 찾으면 해당 값을 배열의 값으로 치환해준다.  

![LIS 이진탐색 그림](https://t1.daumcdn.net/cfile/tistory/993FE1405AADFAF70F)  

위 그림을 통해서 소스의 전체적인 느낌을 파악한 뒤 다른 문제에서 요하는 경로 추적 또한 코드로 보았다.  

```
dp[0] = array[0];
tracking[0] = new Pair(0, array[0]);
int idx = 0;
for (int i = 1; i < n; i++) { 
	if (dp[idx] < array[i]) { 
		dp[++idx] = array[i];
		tracking[i] = new Pair(idx, array[i]);
	}
	else { 
		int ii = lower_bound(idx, array[i]);
		dp[ii] = array[i];
		tracking[i] = new Pair(ii, array[i]);
	}
}
```
이후에는 스택에서 인덱스와 pair의 first을 비교하여 스택에 넣어준 다음 꺼내주게 되면 순서대로 출력할 수 있다.

```
lis.push_back(v[0]);
p.push_back({0, v[0]});

for (int i=1; i<n; i++) {
	int idx = lower_bound(lis.begin(), lis.end(), v[i]) - lis.begin();
	if(idx >= lis.size())  {
		lis.push_back(v[i]);
	}
	else {
		lis[idx] = v[i];
	}
	p.push_back({idx, v[i]});
}
stack<int> st;
int len = lis.size();
cout << len << '\n';
for (int i=n-1; i>=0; i--) {
	if (p[i].first == len-1) {
		st.push(p[i].second);
		len--;
	}
}
while(!st.empty()) {
	cout << st.top() << ' ';
	st.pop();
}
```
나는 이런 식으로 만들어서 pair로 추적하는 아이디어를 집어 넣어서 구현하였다.

[그림 및 소스 출처](https://mygumi.tistory.com/303)  

---
