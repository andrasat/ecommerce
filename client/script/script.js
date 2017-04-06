
window.fbAsyncInit = function() {
  FB.init({
    appId      : '1272249479519191',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.getLoginStatus(statusChangeCallback, true)
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(res) {
  console.log('status')
  console.log(res)

  if(res.status == 'connected') {
    testAPI()
  } else {
    console.log('please login')
  }
}

function testAPI() {
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
  });
}

let navMenu = new Vue({
  el: '#nav',
  data : {
    isActive : false,
    isHidden : true,
    loginMsg : '',
    logoutMsg : 'Logout'
  },
  computed : {
    classObjectNav : function() {
      return {
        'nav-right' : true,
        'nav-menu' : true,
        'is-active' : this.isActive
      }
    },
    classObjectLogout : function() {
      return {
        'nav-item': true,
        'is-hidden': this.checkLogin()
      }
    },
    classObjectCart : function() {
      return {
        'nav-item' : true,
        'has-icon' : true,
        'is-hidden': this.isHidden
      }
    }
  },
  methods : {
    resize : function() {
      console.log(window.innerWidth)
      if($(window).width() < 750) {
        this.isHidden = false
      } else {
        this.isHidden = true
      }
    },
    login : function() {
      FB.login(function(res){
        console.log(res.status)
        if(res.status == 'connected') {
          FB.api('/me', function(response) {
            axios
              .post('http://localhost:3000/cust/login', {
              id : response.id,
              name : response.name
            })
              .then(function(res) {
                console.log(res.data)
                localStorage.setItem('token', res.data)
                window.location.reload()
              })
              .catch(function() {
                alert('Server refused to connect')
              })
          })
        } else {
          console.log('Login error')
        }
      }, {scope: 'public_profile'})
    },
    checkLogin : function() {
      if(localStorage.token) {
        this.loginMsg = 'You are logged in'
        return false
      } else {
        this.loginMsg = 'Login with Facebook'
        return true
      }
    },
    logout : function() {
      console.log('clicked')
      FB.logout(function() {
        localStorage.removeItem('token')
        window.location.reload()
      })
    },
    toggleMenu : function() {
      $('.nav-toggle')
      this.isActive = !this.isActive
    }
  },
  mounted : function() {
    this.checkLogin()
  }
})

navMenu.resize()
$(window).resize(navMenu.resize)