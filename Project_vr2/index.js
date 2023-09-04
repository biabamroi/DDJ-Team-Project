const express = require('express');
const app = express();
const path = require('path');

// 데이터를 저장할 변수
let db;

// 포트 3000 연결
// app.listen(3000, function(){
//   console.log('Server listening on port 3000');
// })

// .ejs 사용 세팅
app.set('view engine', 'ejs');

// 모든 정적 파일 제공
app.use(express.static(__dirname));


// bodyParser 사용 선언
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

// cookieParser
app.use(cookieParser());


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
  app.listen('3000', function(){
    console.log('포트 3000 연결 성공');
  });
})


// 회원가입 시 아이디 중복체크 ??


// 회원가입 --------------------------------------------------------------------
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
      phone : requests.body.country + requests.body.phonenum + requests.body.veritext,
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
  response.redirect("/login.html");
})


// 로그인 --------------------------------------------------------------------

// 세션 환경세팅
// app.use(
//   expressSession({
//     secret: "my key",
//     resave: true,
//     saveUninitialized: true
//   })
// );

// const userID = req.body.userid || req.query.userid;
// const userPW = req.body.userpw || req.query.userpw;

// if (requests.session.user) {
//   // 세션에 유저가 존재한다면
//   response.redirect("/index.html");
// } else {
//   response.redirect("/login.html");
// }

// if (req.session.user) {
//   // 세션에 유저가 존재한다면
//   console.log("이미 로그인중입니다.");
//   res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
//   res.write("<h1> already Login</h1>");
//   res.write(`[ID] : ${userID} [PW] : ${userPW}`);
//   res.write('<a href="/process/example">예시로</a>');
//   res.end();
// } else {
//   req.session.user = {
//     id: userID,
//     pw: userPW,
//     name: username,
//     authorized: true,
//   };
//   res.writeHead(200, { "Content-Type": "text/html; charset=utf8" });
//   res.write("<h1>Login Success</h1>");
//   res.write(`[ID] : ${userID} [PW] : ${userPW}`);
//   res.write('<a href="/index">Move</a>');
//   res.end();
// }

// app.post('/login', function(requests, response){
//   db.collection('user').findOne({
//     ID : requests.body.userid, 
//     PW : requests.body.userpw 
//   }, (function(error, users){
//     if(error){
//       return console.log(error);
//     }
//     if(!users){
//       return response.redirect('/login.html');
//       // response.send("<script>alert('아이디와 비밀번호를 다시 한 번 확인해 주세요.');</script>");
//     }
//     // 로그인 세션 또는 쿠키, 토큰 유지 기능 구현 필요
//     // requests.
//     return response.redirect('/index.html');
//   }))
// })

// 세션 로그인, 로그아웃 --------------------------------------------------------------------


// app.get("/logout", (req, res) => {
//   console.log("로그아웃");

//   if (req.session.user) {
//     console.log("로그아웃중입니다!");
//     req.session.destroy((err) => {
//       if (err) {
//         console.log("세션 삭제 에러가 발생했습니다.");
//         return;
//       }
//       console.log("세션이 삭제됐습니다.");
//       res.redirect("/login.html");
//     });
//   } else {
//     console.log("로그인이 필요합니다.");
//     res.redirect("/login.html");
//   }
// });

// const appServer = http.createServer(app);

// appServer.listen(app.get("port"), () => {
//   console.log(`${app.get("port")}에서 서버실행중.`);
// });




// login 상태에서 zzim 값을 데이터베이스에서 받아서 -> zzim 페이지에서 꺼내오기




// 기본 홈페이지 첫 화면
app.get('/', function(requests, response){
  response.sendFile(__dirname + '/index.html');
})

// 외 페이지
app.get('/index', function(requests, response){
  response.sendFile(__dirname + '/index.html');
})
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
app.get('/find-idpw', function(requests, response){
  response.sendFile(__dirname + '/find-idpw.html');
})
app.get('/join', function(requests, response){
  response.sendFile(__dirname + '/join.html');
})
app.get('/login', function(requests, response){
  response.sendFile(__dirname + '/login.html');
})
app.get('/member-info', function(requests, response){
  response.sendFile(__dirname + '/member-info.html');
})
app.get('/place-details', function(requests, response){
  response.sendFile(__dirname + '/place-details.html');
})
app.get('/today-all', function(requests, response){
  response.sendFile(__dirname + '/today-all.html');
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


