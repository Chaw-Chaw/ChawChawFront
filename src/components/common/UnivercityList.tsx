const univercityList = {
    "가천대학교" : "@gc.gachon.ac.kr",
    "강남대학교":"@kangnam.ac.kr",
    "강릉원주대학교":"@gwnu.ac.kr",
    "강원대학교":"@kangwon.ac.kr",
    "건국대학교 (서울 캠퍼스)":"@konkuk.ac.kr",
    "건국대학교 (글로벌 캠퍼스)":"@kku.ac.kr",
    "강동대학교" : "@gangdong.ac.kr",
    "건양대학교":"@konyang.ac.kr",
    "경기대학교":"@kgu.ac.kr",
    "경동대학교":"@kkduniv.ac.kr",
    "경북대학교":"@kyungpook.ac.kr",
    "경상대학교":"@gnu.ac.kr",
    "경성대학교":"@ks.ac.kr",
    "경운대학교":"@ikw.kr",
    "경일대학교":"@kiu.kr",
    "경주대학교":"@gu.ac.kr",
    "경희대학교":"@khu.ac.kr",
    "계명대학교":"@stu.kmu.ac.kr",
    "고려대학교":"@korea.ac.kr",
    "고신대학교":"@kosin.ac.kr",
    "공주대학교":"@smail.kongju.ac.kr",
    "가톨릭관동대학교":"@cku.ac.kr",
    "광운대학교":"@kw.ac.kr",
    "광주대학교":"@gwangju.ac.kr",
    "광주보건대학교":"@ghu.ac.kr",
    "광주여자대학교":"@kwu.ac.kr",
    "국민대학교":"@kookmin.ac.kr",
    "군산대학교":"@kunsan.ac.kr",
    "극동대학교":"@kdu.ac.kr",
    "금오공과대학교":"@kumoh.ac.kr",
    "남서울대학교":"@nsu.ac.kr",
    "단국대학교":"@dankook.ac.kr",
    "대구대학교":"@daegu.ac.kr",
    "세한대학교":"@knu.ac.kr",
    "대전대학교":"@dju.ac.kr",
    "한밭대학교":"@hanbat.ac.kr",
    "대진대학교":"@daejin.ac.kr",
    "덕성여자대학교":"@duksung.ac.kr",
    "동국대학교":"@dgu.ac.kr",
    "동덕여자대학교":"@dongduk.ac.kr",
    "동명정보대학교":"@tu.ac.kr",
    "동서대학교":"@office.dongseo.ac.kr",
    "동신대학교":"@dsu.kr",
    "동아대학교":"@donga.ac.kr",
    "동양대학교":"@m365.dongyang.ac.kr",
    "명지대학교":"@mji.ac.kr",
    "목원대학교":"@mokwon.ac.kr",
    "목포대학교":"@mokpo.ac.kr",
    "목포해양대학교":"@stu.mmu.ac.kr",
    "배재대학교":"@pcu.ac.kr",
    "부경대학교":"@pukyong.ac.kr",
    "부산대학교":"@pusan.ac.kr",
    "부산외국어대학교":"@office.bufs.ac.kr",
    "삼육대학교":"@syuin.ac.kr",
    "상명대학교":"@smu.ac.kr",
    "상주대학교":"@knu.ac.kr",
    "상지대학교":"@sangji.ac.kr",
    "서강대학교":"@sogang.ac.kr",
    "서경대학교":"@skuniv.ac.kr",
    "서울대학교":"@snu.ac.kr",
    "서울과학기술대학교":"@seoultech.ac.kr",
    "서울시립대학교":"@uos.ac.kr",
    "서울여자대학교":"@swu.ac.kr",
    "서원대학교":"@office.seowon.ac.kr",
    "선문대학교":"sunmoon.ac.kr",
    "성균관대학교":"skku.ac.kr",
    "성신여자대학교":"sungshin.ac.kr",
    "세명대학교":"semyung.ac.kr",
    "세종대학교":"sejong.ac.kr",
    "수원대학교":"suwon.ac.kr",
    "숙명여자대학교":"@sookmyung.ac.kr",
    "순천대학교":"sunchon.ac.kr",
    "순천향대학교":"sch.ac.kr",
    "숭실대학교":"soongsil.ac.kr",
    "신라대학교":"silla.ac.kr",
    "아주대학교":"ajou.ac.kr",
    "안동대학교":"andong.ac.kr",
    "안양대학교":"anyang.ac.kr",
    "여수대학교":"yosu.ac.kr",
    "연세대학교":"yonsei.ac.kr/  (서울 캠퍼스"
                      http://dragon.yonsei.ac.kr/  (원주 캠퍼스)
    "영남대학교":"yeungnam.ac.kr",
    "영동대학교":"youngdong.ac.kr",
    "영산대학교":"ysu.ac.kr",
    "용인대학교":"yiu.ac.kr",
    "우석대학교":"woosuk.ac.kr",
    "우송대학교":"woosong.ac.kr",
    "우송대학교":"wsu.ac.kr",
    "울산대학교":"ulsan.ac.kr",
    "원광대학교":"wonkwang.ac.kr",
    "위덕대학교":"uiduk.ac.kr",
    을지의과대학 eulji.ac.kr/univ/
    "이화여자대학교":"ewha.ac.kr",
    "인제대학교":"inje.ac.kr",
    "인천대학교":"inchon.ac.kr",
    "인하대학교":"inha.ac.kr",
    "전남대학교":"chonnam.ac.kr",
    "전북대학교":"chonbuk.ac.kr",
    "전주대학교":"jeonju.ac.kr",
    "제주대학교":"cheju.ac.kr",
    "조선대학교":"chosun.ac.kr",
    "중부대학교":"joongbu.ac.kr",
    "중앙대학교":"cau.ac.kr/  (서울대학교":""
                      http://web.cau.ac.kr/  (안성캠퍼스)
    "진주산업대학교":"chinju.ac.kr",
    "창원대학교":"changwon.ac.kr",
    "천안대학교":"chonan.ac.kr",
    "청운대학교":"cwunet.ac.kr",
    "청주대학교":"chongju.ac.kr",
    "초당대학교":"chodang.ac.kr",
    "추계예술대학교":"chugye.ac.kr",
    "충남대학교":"chungnam.ac.kr",
    "충북대학교":"chungbuk.ac.kr",
    "충주대학교":"chungju.ac.kr",
    "칼빈대학교":"calvin.ac.kr",
    "평택대학교":"ptuniv.ac.kr",
    "포천중문의과대학교":"cha.ac.kr",
    "포항공과대학교":"postech.ac.kr",
    "한경대학교":"http://anu.ansung.ac.kr",
    "한국기술교육대학교":"kut.ac.kr",
    "한국산업기술대학교":"kpu.ac.kr",
    "한국외국어대학교":"@hufs.ac.kr",
    "한국항공대학교":"hangkong.ac.kr",
    "한국해양대학교":"kmaritime.ac.kr",
    "한남대학교":"hannam.ac.kr",
    "한동대학교":"han.ac.kr",
    "한라대학교":"halla.ac.kr",
    "한려대학교":"hanlyo.ac.kr",
    "한림대학교":"http://sun.hallym.ac.kr",
    "한서대학교":"hanseo.ac.kr",
    "한성대학교":"hansung.ac.kr",
    "한세대학교":"hansei.ac.kr",
    "한신대학교":"hanshin.ac.kr",
    "한양대학교":"hanyang.ac.kr/  (서울 캠퍼스"
                      http://web.hanyang.ac.kr/  (안산 캠퍼스)
    "협성대학교":"hyupsung.ac.kr",
    "호남대학교":"honam.ac.kr",
    "호서대학교":"hoseo.ac.kr",
    "호원대학교":"howon.ac.kr",
    "홍익대학교":"hongik.ac.kr/  (서울 캠퍼스"
                      http://shinan.hongik.ac.kr/  (조치원 캠퍼스)
    
     
    
    < 교육대학 > 맨 위로 가기
    
    "공주교육대학교":"kongju-e.ac.kr",
    "광주교육대학교":"kwangju-e.ac.kr",
    "대구교육대학교":"taegu-e.ac.kr",
    "부산교육대학교":"pusan-e.ac.kr",
    "서울교육대학교":"seoul-e.ac.kr",
    "인천교육대학교":"inchon-e.ac.kr",
    "전주교육대학교":"chonju-e.ac.kr",
    "제주교육대학교":"cheju-e.ac.kr",
    "진주교육대학교":"chinju-e.ac.kr",
    "청주교육대학교":"chongju-e.ac.kr",
    "춘천교육대학교":"cnue-e.ac.kr",
    "한국교원대학교":"knue.ac.kr",
    
    
    
    < 신학대학 / 불교대학 > 맨 위로 가기
    
    "가톨릭대학교":"cuk.ac.kr",
    "감리교신학대학교":"http://mts.ac.kr",
    "광주가톨릭대학교":"kjcatholic.ac.kr",
    "국제신학대학원대학교":"gukje.ac.kr",
    "그리스도신학대학교":"http://kcu.ac.kr",
    "기독교신학대학원대학교":"ctus.edu"
    "나사렛대학교":"http://dove.nazarene.ac.kr",
    "대구효성가톨릭대학교":"cataegu.ac.kr",
    "대전가톨릭대학교":"dcatholic.ac.kr",
    대한신학교 http://myhome.netsgo.com/cscu/
    부산가톨릭대학 pcc.ac.kr/
    "서울신학대학교":"stu.ac.kr",
    "서울장신대학교":"seouljangsin.ac.kr",
    "성결대학교":"sungkyul.ac.kr",
    "성공회대학교":"skhu.ac.kr",
    순복음신학원 fgts.yfgc.org/
    "아세아연합신학대학교":"acts.edu./contact.htm"
    "영남신학대학교":"yntcs.ac.kr",
    "영산원불교대학교":"youngsan.ac.kr",
    "원불교대학원대학교":"wonbuddhism.ac.kr",
    "웨스트민스터신학대학원대학교":"westminster.ac.kr",
    "장로회신학대학교":"pcts.ac.kr",
    "총신대학교":"chongshin.ac.kr",
    "침례신학대학교":"kbtus.ac.kr",
    프레이즈음악신학교 praise.or.kr/
    "한영신학대학교":"hytu.ac.kr",
    "한일장신대학교":"hanil.ac.kr",
    "합동신학대학원대학교":"hapdong.ac.kr",
    "호남신학대학교":"htus.ac.kr",
    "횃불트리니티신학대학원대학교":"ttgst.ac.kr/kormain.as"
    
    
     
    
    < 특수학교 / 대학원학교 > 맨 위로 가기
    
    공군사관학교 afa.ac.kr/
    광주과학기술원 kjist.ac.kr/
    국립경찰대학 police.ac.kr/
    국립세무대학 pctax.co.kr/~ntc/
    국제산업디자인대학원 idas.ac.kr/
    "성산효도대학원대학교":"hyo.ac.kr",
    육군3사관학교 N/A
    육군사관학교 kma.ac.kr/
    "한국방송대학교":"knou.ac.kr",
    한국예술종합학교 knua.ac.kr/
    "한국정보통신대학원대학교":"icu.ac.kr",
    한국철도대학 krc.ac.kr/
    한국과학기술원 kaist.ac.kr/
    "한국체육대학교":"knupe.ac.kr",
    해군사관학교 navy.ac.kr/


};

export { univercityList };
