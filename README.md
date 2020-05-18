# Daily Study

## 5월
* 18日
이항 계수 (페르마 소정리 이용)
[SWEA](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AWXGKdbqczEDFAUo&categoryId=AWXGKdbqczEDFAUo&categoryType=CODE)
[BOJ](https://www.acmicpc.net/problem/11401)  

이항 계수란 n개의 원소에서 r개의 원소를 뽑아내는 경우의 수  
즉, 조합. 수식으로는 n!/(r!(n-r)!)  
다른 문제에서는 nCr = (n-1)Cr + (n-1)C(r-1) 이걸로 해결 가능하였으나, 이번 문제는 시간초과로 실패 검색 결과 페르마의 소정리 이용해야함.  
페르마의 소정리란 p가 소수, a가 정수 일때,  ![페르마 소정리](https://wikimedia.org/api/rest_v1/media/math/render/svg/7ff656f721894b9a50a2b1d18538463a6a4ec15f)  
**(대수학에서의 합동이란 mod p 연산시에 값이 동일한 경우)**  
양쪽에 a로 나눠주게 되면 ![페르마 소정리](https://wikimedia.org/api/rest_v1/media/math/render/svg/2149302899fcbf99c1b46c536549f7ed7b0a6b2b)  
한번 더 a로 나눠주게 되면 a의 역수가 a^(p-2)란 걸 증명할 수 있다.  
문제의 식인 nCr = n!/(r!(n-r)!) % p  
-> A = n!, B = (r!(n-r)!)  
-> (A*B^(-1)) % p  
-> ((A % p)*(B^(-1) % p)) % p  
-> B^(-1)은 B의 역수  
-> (A*B^(p-2)) % p  
따라서 factorial을 구하고 factorial의 역을 구해서 원하는 값을 집어넣어 답을 구한다.  
+ 거듭 제곱시에 분할 정복을 사용하면  
```long long power(ll x, ll y) {  
	long long result = 1;  
	while(y) {  
		if (y%2) {  
			result *= x;
			result %= P;
		}
		x *= x;
		x %= P;
		y /= 2;
	}
	return result;
}  
