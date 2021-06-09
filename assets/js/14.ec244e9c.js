(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{389:function(A,t,a){"use strict";a.r(t);var s=a(25),n=Object(s.a)({},(function(){var A=this,t=A.$createElement,a=A._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":A.$parent.slotKey}},[a("h1",{attrs:{id:"문자열-검색"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#문자열-검색"}},[A._v("#")]),A._v(" 문자열 검색")]),A._v(" "),a("h2",{attrs:{id:"naive-matching"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#naive-matching"}},[A._v("#")]),A._v(" Naive Matching")]),A._v(" "),a("p",[A._v("먼저 "),a("code",[A._v("Naive Matching 알고리즘")]),A._v("은 찾고자하는 문자열과 주어진 문자열을 하나하나 비교하면서 처음부터 끝까지 확인하는 방식이다. 최악의 경우 시간복잡도 O((n-m)m)이 걸린다. 하나하나 일일이 검사하므로 작은 문자열이라면 시도할만 하다. 하지만 대부분이 큰 문자열이 주어지므로 최대한 피하자.")]),A._v(" "),a("h2",{attrs:{id:"rabin-karp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rabin-karp"}},[A._v("#")]),A._v(" Rabin-Karp")]),A._v(" "),a("p",[A._v("두번째론 "),a("code",[A._v("라빈-카프")]),A._v(" 알고리즘이 있다. 이 알고리즘은 해시를 이용하여 해시끼리 비교하는 알고리즘이다. 먼저 찾으려는 문자열의 해시값을 구하고 주어진 문자열에서 찾으려는 문자열의 크기만큼 잡고 해시값을 구해서 비교해가며 찾으면 된다. 하지만 문자열이 매우 커질 수록 충돌이 일어날 가능성이 커진다고 한다. (약 1억자리 이상)"),a("br"),A._v("\n그리고 반복되며 찾을 때마다 아래처럼 이용하면 된다. 시간복잡도는 평균적으로 O(n+m)이다."),a("br"),A._v(" "),a("img",{staticStyle:{"min-width":"100px","min-height":"100px",background:"url(data:image/gif;base64,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) no-repeat center","background-size":"30px 30px"},attrs:{src:"/TIL/image/Algorithm/Rabin-Karp.JPG",alt:"Rabin-Karp",loading:"lazy"}})]),A._v(" "),a("h2",{attrs:{id:"kmp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#kmp"}},[A._v("#")]),A._v(" KMP")]),A._v(" "),a("p",[A._v("세번째론 "),a("code",[A._v("KMP")]),A._v(" 알고리즘이 있다. 이 알고리즘은 접두사와 접미사에 대해 알아야한다. 예를 들어서 ABCAB란 문장이 있다하자."),a("br"),A._v("\n접두사는 A, AB, ABC, ABCB, ABCBA"),a("br"),A._v("\n접미사는 B, BA, BAC, BACB, BACBA 이다."),a("br"),A._v("\n즉, 앞에서 자르기 시작한 것과 뒤에서 자르기 시작한 것의 차이이다."),a("br"),A._v("\n이제 pi라는 배열을 만들어 줄건데 pi란 배열은 접두사와 접미사가 같은 경우를 조건으로 두고 그 단어를 pi라는 배열에 넣는 것이다. 왜냐 불필요한 부분을 넘기고 그 전에 찾을 문자열이 포함되었는지 확인 해야하기 때문이다. 만약, 무작정 인덱스 크기를 잡고 넘기게 되면 그 넘어간 인덱스 중에 찾아야할 문자열의 일부가 있을 수 있기 때문이다. 시간복잡도는 O(n+m)이다.")]),A._v(" "),a("div",{staticClass:"language-cpp extra-class"},[a("pre",{pre:!0,attrs:{class:"language-cpp"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[A._v("KMP")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("(")]),A._v("A"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(",")]),A._v(" P"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(")")]),A._v(" \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("{")]),A._v(" \n\t"),a("span",{pre:!0,attrs:{class:"token function"}},[A._v("preprocessing")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("(")]),A._v("P"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v(" \n\ti  ← "),a("span",{pre:!0,attrs:{class:"token number"}},[A._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v("  ▷ 본문 문자열 포인터 \n\tj  ← "),a("span",{pre:!0,attrs:{class:"token number"}},[A._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v("  ▷ 패턴 문자열 포인터 \n\t▷ n"),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v(":")]),A._v(" 배열 A"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),A._v("의 길이"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(",")]),A._v(" m"),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v(":")]),A._v(" 배열 P"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),A._v("의 길이 \n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[A._v("while")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("(")]),A._v("i ≤ n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(")")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("{")]),A._v("                                 \n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[A._v("if")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("(")]),A._v("j "),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("=")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[A._v("0")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("or")]),A._v(" A"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v("i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("=")]),A._v(" P"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(")")]),A._v(" \n\t\t\tthen "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("{")]),A._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v("  j"),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("}")]),A._v("           \n\t\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[A._v("else")]),A._v("  j ← π "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[A._v("if")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("(")]),A._v("j "),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("=")]),A._v(" m"),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("+")]),a("span",{pre:!0,attrs:{class:"token number"}},[A._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(")")]),A._v(" then "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("{")]),A._v(" \n               \tA"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v("i"),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("-")]),A._v("m"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),A._v("에서 매치되었음을 알림"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v(" \n                \tj ← π "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v("                     \n\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("}")]),A._v("  \n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("}")]),A._v(" \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("}")]),A._v(" \n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[A._v("preprocessing")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("(")]),A._v("P"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(")")]),A._v(" \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("{")]),A._v(" \n\ti  ← "),a("span",{pre:!0,attrs:{class:"token number"}},[A._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v("  ▷ 본문 문자열 포인터 \n\tk  ← "),a("span",{pre:!0,attrs:{class:"token number"}},[A._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v("  ▷ 패턴 문자열 포인터 \n\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[A._v("while")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("(")]),A._v("j ≤ m"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(")")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("{")]),A._v("                                 \n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[A._v("if")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("(")]),A._v("k "),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("=")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[A._v("0")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("or")]),A._v(" A"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("=")]),A._v(" P"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v("k"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(")")]),A._v(" \n\t\t\tthen "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("{")]),A._v(" j"),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v("  k"),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v(" π "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),A._v(" ← k"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("}")]),A._v("           \n\t\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[A._v("else")]),A._v("  k ← π "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v("k"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v("\n\t\t"),a("span",{pre:!0,attrs:{class:"token keyword"}},[A._v("if")]),A._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("(")]),A._v("j "),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("=")]),A._v(" m"),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("+")]),a("span",{pre:!0,attrs:{class:"token number"}},[A._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(")")]),A._v(" then "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("{")]),A._v(" \n               \tA"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v("i"),a("span",{pre:!0,attrs:{class:"token operator"}},[A._v("-")]),A._v("m"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),A._v("에서 매치되었음을 알림"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v(" \n                \tj ← π "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("[")]),A._v("j"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v(";")]),A._v("                     \n\t\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("}")]),A._v("  \n\t"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("}")]),A._v(" \n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[A._v("}")]),A._v("\n")])])]),a("h2",{attrs:{id:"boyer-moore"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#boyer-moore"}},[A._v("#")]),A._v(" Boyer-Moore")]),A._v(" "),a("p",[A._v("마지막으로, "),a("code",[A._v("보이어-무어")]),A._v(" 알고리즘인데, 이 알고리즘은 이해하기 어렵다. "),a("a",{attrs:{href:"http://www.cs.jhu.edu/~langmea/resources/lecture_notes/boyer_moore.pdf",target:"_blank",rel:"noopener noreferrer"}},[A._v("참조pdf"),a("OutboundLink")],1),A._v(" 이 곳을 통해 그림으로 이해를 돕고자 한다.\n"),a("a",{attrs:{href:"https://personal.utdallas.edu/~besp/demo/John2010/boyer-moore.htm",target:"_blank",rel:"noopener noreferrer"}},[A._v("보이어-무어 계산"),a("OutboundLink")],1),a("br"),A._v("\nKMP 알고리즘과 비슷한 개념을 가지고 있다. 최대한 많이 건너뛰면서 비교를 하는 것이다. 하지만 다른 알고리즘과 다른 부분은 오른쪽에서 왼쪽으로 문자열을 비교한다. 물론 이동은 왼쪽에서 오른쪽으로 한다. 이 알고리즘이 대부분의 프로그램의 문자열 검색 방법으로 사용되고 있다."),a("br"),A._v("\n오른쪽 끝의 문자가 일치 하지 않고 주어진 문자에 찾아야하는 문자가 존재하지 않으면 패턴 길이만큼 이동한다."),a("br"),A._v("\n불일치가 발생하면 최대의 효율을 내는 두가지 방법 중 고른다.")]),A._v(" "),a("ol",[a("li",[A._v("나쁜 문자 이동 (Bad Character Shift)")]),A._v(" "),a("li",[A._v("착한 접미부 이동 (Good Suffix Shift)\n"),a("ul",[a("li",[A._v("나쁜 문자 이동은 (나쁜 문자란, 본문 문자 중 패턴과 일치 하지 않은 문자)\n"),a("ul",[a("li",[A._v("패턴의 오른쪽부터 비교해서 불일치 지점 찾기.")]),A._v(" "),a("li",[A._v("본문의 불일치 지점 문자와 일치하는 패턴의 가장 오른쪽 지점만큼 이동 시킨다.")])])]),A._v(" "),a("li",[A._v("착한 접미부 이동은 (착한 접미부란, 본문 문자 중 패턴의 접미부와 일치하는 문자)\n"),a("ul",[a("li",[A._v("첫번째 경우엔 착한 접미부와 동일한 문자가 왼쪽 문자열중 존재")]),A._v(" "),a("li",[A._v("두번째 경우엔 패턴에 착한 접미부가 없지만 접두부가 이리하는 경우 KMP와 비슷")])])])])])])])}),[],!1,null,null,null);t.default=n.exports}}]);