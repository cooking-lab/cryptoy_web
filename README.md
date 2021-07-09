# CryptoyWeb   
블록체인과 유전알고리즘을 이용한 웹 게임   

## 요약   
**블록체인 기술을 바탕으로 NFT 토큰을 제작한다.   
각 토큰은 유전 알고리즘을 통해 생성되며, DNA에 따라 종과 외형의 발현 요소를 결정한다.**   

## 목표   
- Toy NFT 토큰 거래 마켓 제공   
- 플레이어가 보유한 NFT로 게임을 플레이 할 수 있는 환경 제공   

## 구조 
- [BlockChain & Genetic Algorithm](https://github.com/cooking-lab/GeneLab)   
![image](https://user-images.githubusercontent.com/29244603/125054425-27819800-e0e1-11eb-94ce-2b80eb5bcf1f.png)   

## 기본 가이드   
**- 메인화면**   
![image](https://user-images.githubusercontent.com/29244603/125058952-c14b4400-e0e5-11eb-9ca3-784bbffd6735.png)   
  * 로그인시 게임을 플레이 할 수 있는 메인화면(비회원)   

**- All Toy**   
![image](https://user-images.githubusercontent.com/29244603/125059154-fbb4e100-e0e5-11eb-8319-e655ae91a31e.png)   
  * 블록체인 내 모든 정보를 볼 수 있는 탭   
  * 본인이 소유한 NFT 토큰 뿐 아니라 타인의 토큰도 확인할 수 있다.   

+ Filter   
  1. Auction Type   
    - for sale : 판매 등록된 캐릭터   
    - rental : 대여를 위해 등록된 캐릭터   
    - other : 마켓에 등록되지 않은 캐릭터

  2. Species   
    - Doll : 인형   
    - Car : 자동차   
    - Robot : 로봇   

  3. Price   
    마켓에 등록된 캐릭터 중 설정된 가격대에 있는 캐릭터 조회  

  4. Search   
    설정한 필터값이 적용된 캐릭터 조회   

+ Register   
  자신이 소유한 캐릭터를 마켓에 등록   
  
+ Other   
  캐릭터 이미지 클릭시 해당 캐릭터의 상세 페이지로 이동   
  Gen : 캐릭터 세대   
  male / female : 성별   

**- 캐릭터 구매**   
![image](https://user-images.githubusercontent.com/29244603/125061112-fb1d4a00-e0e7-11eb-819b-8a1f36411721.png)   
![image](https://user-images.githubusercontent.com/29244603/125061137-ff496780-e0e7-11eb-8fe2-a19add727903.png)   
  * Family : 1세대 이상의 캐릭터에서 활성, 본 캐릭터 교배에 사용된 캐릭터를 제시한다.
    * (왼쪽이 엄마, 오른쪽이 아빠)

**- 마켓에 캐릭터 등록**   
![image](https://user-images.githubusercontent.com/29244603/125061596-74b53800-e0e8-11eb-901d-da47eae73c7a.png)   

**- 마켓에 등록된 캐릭터(판매)**   
![image](https://user-images.githubusercontent.com/29244603/125061375-40417c00-e0e8-11eb-8a23-a04d9e47d342.png)   

**- 마켓에 등록된 캐릭터(대여)**   
![image](https://user-images.githubusercontent.com/29244603/125061439-4d5e6b00-e0e8-11eb-97be-c8ff0dea3ac2.png)   
   
- - -   
## 게임 가이드   
**- 메인화면**   
![image](https://user-images.githubusercontent.com/29244603/125062342-3e2bed00-e0e9-11eb-99cb-e7c3dad53c2f.png)   
  * 오른쪽 화살표는 게임 화면으로의 전환   
  * 왼쪽 화살표는 마이룸으로의 전환   

**A. 시작**   
![image](https://user-images.githubusercontent.com/29244603/125062389-4b48dc00-e0e9-11eb-8507-4d3cb6cdb619.png)   

**B. 진행**   
![image](https://user-images.githubusercontent.com/29244603/125062412-50a62680-e0e9-11eb-9a4f-ada39dd84c29.png)   
  * 말풍선에서 요구하는 부품을 지니고 있는 개체를 선택해서 제시한다.   

**C. 완료**   
![image](https://user-images.githubusercontent.com/29244603/125062429-556ada80-e0e9-11eb-821e-44cac864a1d5.png)   

**- 합성**   
![image](https://user-images.githubusercontent.com/29244603/125062721-ac70af80-e0e9-11eb-8a28-97164fc4a3fb.png)   
![image](https://user-images.githubusercontent.com/29244603/125063010-f78ac280-e0e9-11eb-8f83-303d6b18d54a.png)   
  * 같은 종족에 성별이 다른 두 개체를 선택하여 합성을 진행한다.   
  * 단, 족보상 5촌 이내로 판별될 경우 합성을 진행할 수 없다. (자가증식방지)   

**- 마이룸**   
![image](https://user-images.githubusercontent.com/29244603/125063186-23a64380-e0ea-11eb-89ad-70613471b70e.png)
