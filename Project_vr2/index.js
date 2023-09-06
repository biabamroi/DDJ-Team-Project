const express = require('express');
const app = express();
const path = require('path');

// 데이터를 저장할 변수
let db;

// .ejs 사용 세팅
app.set('view engine', 'ejs');

// 모든 정적 파일 제공
app.use(express.static(__dirname));

// npm install method-override 라이브러리 ★ 설치 ★
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

// npm install -g nodemon ★ 전역 설치 ★

// MongoDB 연결
const MongoClient = require('mongodb').MongoClient;

// Database : Data
// 저장소 DDju
// 콜렉션 user (회원)
// 콜렉션 zzim (좋아요) 
// 콜렉션 review (리뷰)
// 콜렉션 api (API)

// Database ID admin PW zbJIiHYEKSsLa6Jg
MongoClient.connect('mongodb+srv://admin:zbJIiHYEKSsLa6Jg@data.faox2rv.mongodb.net/?retryWrites=true&w=majority', function(error, client){
  if(error){
    return console.log(error);
  }

  db = client.db('DDju');
  // 포트 3000 연결
  app.listen('3000');
})



// npm install body-parser  ★ 설치 ★
// bodyParser 사용 선언
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

// cookieParser
// npm install cookie-parser --save  ★ 설치 ★
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.get('/', function (req, res) {
  // Cookies that have not been signed 서명되지 않은 쿠키
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed 서명된 쿠키
  console.log('Signed Cookies: ', req.signedCookies)
});


// 세션  ★ 설치 ★
// npm install passport   
// npm install passport-local   
// npm install express-session  
// npm install -s express-session 

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret : 'secret', resave : true, saveUninitialized : false}));
app.use(passport.initialize());
app.use(passport.session());


// 회원가입 시 아이디 중복체크 - 추후 업데이트


// 회원가입 --------------------------------------------------------------------

app.get('/join', function(requests, response){
  response.render('join.ejs');
})

app.post('/join', function(requests, response){
  db.collection('total').findOne({name:'dataLength'}, function(error, result){
    console.log(result.totalData);
    let totalDataLength = result.totalData;

    db.collection('user').insertOne({
      _id : totalDataLength+1, 
      ID : requests.body.userid, 
      PW : requests.body.userpw, 
      name : requests.body.username,
      birth : requests.body.year + requests.body.month + requests.body.date,
      gender : requests.body.gender,
      email : requests.body.usermail,
      phone : requests.body.country + requests.body.phonenum,
      adress : requests.body.sample6_postcode + requests.body.sample6_address + requests.body.sample6_detailAddress + requests.body.sample6_extraAddress
    }, function(error, result){
      if(error){
        return console.log(error);
      }
    })

    db.collection('total').updateOne({name : 'dataLength'},
    {$inc : {totalData:1}},
    function(error, result){
      if(error){
        return console.log(error);
      }
    })
  })
  response.redirect('/login');
})



// 로그인 --------------------------------------------------------------------

app.get('/login', function(requests, response){
  response.render('login.ejs');
})

app.post('/login', function(requests, response){
  db.collection('user').findOne({
    ID : requests.body.userid, 
    PW : requests.body.userpw 
  }, (function(error, users){
    if(error){
      return console.log(error);
    }
    if(!users){
      return response.redirect('/login.html');
      // response.send("<script>alert('아이디와 비밀번호를 다시 한 번 확인해 주세요.');</script>");
    }
    // 로그인 세션 또는 쿠키, 토큰 유지 기능 구현 필요
    // requests.
    return response.redirect('/index.html');
  }))
})

app.post('/logout', function(requests, response){

})



// login 상태에서 zzim 값을 데이터베이스에서 받아서 -> zzim 페이지에서 꺼내오기







// 기본 홈페이지 첫 화면
app.get('/', function(requests, response){
  response.sendFile(__dirname + '/index.html');
})



// 외 페이지
app.get('/index', function(requests, response){
  response.sendFile(__dirname + '/index.html');
})
// app.get('/join', function(requests, response){
//   response.sendFile(__dirname + '/join.html');
// })
// app.get('/login', function(requests, response){
//   response.sendFile(__dirname + '/login.html');
// })
// app.get('/find-idpw', function(requests, response){
//   response.sendFile(__dirname + '/find-idpw.html');
// })
app.get('/map', function(requests, response){
  response.sendFile(__dirname + '/map.html');
})
app.get('/about', function(requests, response){
  response.sendFile(__dirname + '/about.html');
})
app.get('/contact', function(requests, response){
  response.sendFile(__dirname + '/contact.html');
})
app.get('/course-daejeon', function(requests, response){
  response.sendFile(__dirname + '/course-daejeon.html');
})
app.get('/course-details', function(requests, response){
  response.sendFile(__dirname + '/course-details.html');
})
app.get('/member-info', function(requests, response){
  response.sendFile(__dirname + '/member-info.html');
})
app.get('/place-details', function(requests, response){
  response.sendFile(__dirname + '/place-details.html');
})
app.get('/today-all', function(requests, response){
  db.collection('api').find().toArray(function(error, result){
    response.render('today-all.ejs', {api : result})
  })
})
app.get('/today-do', function(requests, response){
  response.sendFile(__dirname + '/today-do.html');
})
app.get('/today-eat', function(requests, response){
  response.sendFile(__dirname + '/today-eat.html');
})
app.get('/today-see', function(requests, response){
  response.sendFile(__dirname + '/today-see.html');
})
app.get('/zzim', function(requests, response){
  response.sendFile(__dirname + '/zzim.html');
})
app.get('/policy', function(requests, response){
  response.sendFile(__dirname + '/policy.html');
})
app.get('/privacy', function(requests, response){
  response.sendFile(__dirname + '/privacy.html');
})
app.get('/sitemap', function(requests, response){
  response.sendFile(__dirname + '/sitemap.html');
})
app.get('/search', function(requests, response){
  response.sendFile(__dirname + '/search.html');
})




// api 데이터 파싱 --------------------------------------------------------------------------

// 1. 기본정보(콘텐츠id, 제목, 관광타입, 시군구코드, 이미지, 주소, 우편번호, 지도좌표, 등록일)
// let url = "https://apis.data.go.kr/B551011/KorService1/areaBasedList1?numOfRows=785&MobileOS=ect&MobileApp=DDju&_type=json&areaCode=3&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D";

// fetch(url)
// .then((res) => res.json())
// .then((myJson) => {
//   let daejeon = myJson.response.body.items.item;
//   for(let i = 0; i < daejeon.length; i++) {
//     db.collection('api').insert({_id : daejeon[i].contentid,
//       'title' : daejeon[i].title, 'contenttypeid' : daejeon[i].contenttypeid,
//       'sigungucode' : daejeon[i].sigungucode, 'img' : daejeon[i].firstimage,
//       'addr1' : daejeon[i].addr1, 'addr2' : daejeon[i].addr2, 'zipcode' : daejeon[i].zipcode,
//       'mapx' : daejeon[i].mapx, 'mapy' : daejeon[i].mapy,
//       'createdtime' : daejeon[i].createdtime}, function(error, result){
//       console.log('db에 저장완료!')
//     })
//   }
// })

// 2. 필요없는 데이터 삭제하기 : contenttypeid가 32(숙소)인 데이터
// app.get('/api', function(){
//   db.collection('api').deleteMany({contenttypeid : '32'}, function(error, result){
//     console.log('삭제 완료!')
//     if(error) {
//       console.log(error)
//     }
//   })
// })

// 3. Mongodb에서 데이터 가져와서 일치하는 id값에 필요한 Key값 추가하기
// (1) 개요, 홈페이지 주소
// app.get('/api', function(requests, response){
//   db.collection('api').find().toArray(function(error, result){
//     // console.log(result.length)
//     for(let i = 600; i < 767; i++) {
//       let url = 'https://apis.data.go.kr/B551011/KorService1/detailCommon1?MobileOS=ect&MobileApp=DDju&_type=json&contentId=' + result[i]._id + '&defaultYN=Y&overviewYN=Y&serviceKey=K3ffxC1oIoWzYskEUMHmA3hfplXmJTt08QidPS9Br4fcnakaukocNyaP5ADWFtSMQUivJzOwjmKlnqVUEADYXQ%3D%3D';

//       fetch(url)
//       .then((res) => res.json())
//       .then((json) => {
//         let text = json.response.body.items.item;
//         // console.log(text[0].overview, text[0].hmpg)
        
//         db.collection('api').update({_id : result[i]._id}, {$set : {'overview' : text[0].overview, 'hmpg' : text[0].hmpg}}, function(error, result){
//           if(error) {
//             return console.log(error)
//           } 
//           console.log('db에 저장완료!' + i)
//         })
//       })
//     }
//   })
// })

// (2) 이용시간, 쉬는날, 문의 및 안내 등
  // contenttypeid -> find, url 값 같게 설정
  // result.length 확인 후 i 설정
  // 데이터 한개 먼저 시범으로 확인 후 update 시작
  // 12 : {$set : {'usetime' : text[0].usetime, 'restdate' : text[0].restdate, 'infocenter' : text[0].infocenter}}
  // 14 : {$set : {'usetime' : text[0].usetimeculture, 'restdate' : text[0].restdateculture, 'infocenter' : text[0].infocenterculture}}
  // 행사 홈페이지 정보 필요한지 확인
  // 15 : {$set : {'startdate' : text[0].eventstartdate, 'enddate' : text[0].eventenddate, 'eventplace' : text[0].eventplace}}
  // 28 : {$set : {'usetime' : text[0].usetimeleports, 'restdate' : text[0].restdateleports, 'infocenter' : text[0].infocenterleports}}
  // 38 : {$set : {'opentime' : text[0].opentime, 'restdate' : text[0].restdateshopping, 'infocenter' : text[0].infocentershopping}}
  // 39 : {$set : {'opentime' : text[0].opentimefood, 'restdate' : text[0].restdatefood, 'infocenter' : text[0].infocenterfood}}
// app.get('/api', function(requests, response){
//   db.collection('api').find({contenttypeid : '39'}).toArray(function(error, result){
//     // console.log(result.length)
//     for(let i = 200; i < 417; i++) {
//       let url = 'https://apis.data.go.kr/B551011/KorService1/detailIntro1?MobileOS=ect&MobileApp=DDju&_type=json&contentId=' + result[i]._id + '&contentTypeId=39&serviceKey=SLJe0Elsk0DOYqHIPeUB7PP2WOW3J0LjCct3gZhtNfafIAU7cyzRTDGocxAQWuLvgm2cRPKIAJPkJmUJnWO%2FrA%3D%3D';
//       fetch(url)
//       .then((res) => res.json())
//       .then((json) => {
//         let text = json.response.body.items.item;

//         db.collection('api').update({_id : result[i]._id},
//           {$set : {'opentime' : text[0].opentimefood, 'restdate' : text[0].restdatefood, 'infocenter' : text[0].infocenterfood}}, function(error, result){
//             if(error) {
//               return console.log(error)
//             } 
//             console.log('db에 저장완료!' + i)
//         })
//       })
//     }
//   })
// })