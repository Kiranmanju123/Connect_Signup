//CHECKS FOR CORRECT PASSWORD AND AUTO FILLS THE DATA
function checkpass() {
        const ip="https://test.1ounce.in/";
		$('#load_icon1').addClass('spinner-border text-light');
		let phn = document.getElementById("phn").value;
		let pass = document.getElementById("user_password").value;
		
		$.post(`${ip}connect/login/`, { username:phn,password:pass } ,function(data,status){
			$('#load_icon1').removeClass('spinner-border text-light');
           console.log(JSON.stringify(data));
           if(status=="success") {
			   document.getElementById("login_check").disabled = false;
			   document.getElementById("username").value = `${data.username}`;
			   document.getElementById("pincode").value = `${data.pincode}`;
			   document.getElementById("area").value = `${data.area}`;
			   document.getElementById("state").value = `${data.state}`;
			   $(".signup_step1").hide();
            	$(".signup_step2").show();
				//$(".hide").hide();
				let inp = data.pincode
				fetch(`${ip}common/pincode/${inp}/`)
			.then(function(res){
				
			 return res.json()
			})
			.then(function(data){
				
			
			let options="";
			areas = data;
			for(let i=0;i<areas.results.length;i++){
			options += `<option value="${areas.results[i].id}">${areas.results[i].area}</option>`
		   
			}
		   document.getElementById("area").innerHTML = options;
		   

			})
				
           }

        }).fail(function(data) {
			$('#load_icon1').removeClass('spinner-border text-light');
        	 console.log("error", data.status);
        	  if(data.status==500) {
			   $("#invalid_details").show()
			  
		   }
		   
		   
        })

		
	}




//AJAX POST REQUEST TO SUBMIT DATA TO THE SIGNUP API
        function finalData() {
        const ip="https://test.1ounce.in/";
	    let phone = document.getElementById("phn").value;
		let profession = document.getElementById("profession").value;
		let username = document.getElementById("username").value;
		let email = document.getElementById("email").value;
		let company_name = document.getElementById("company_name").value;
		let address = document.getElementById("address").value;
		let pincode = document.getElementById("pincode").value;
		let pin_id = document.getElementById("area").value;
		let password = document.getElementById("pass1").value;
		let title = document.getElementById("title").value;
		let work_description = document.getElementById("wrkdesp").value;
		let profile_image = document.getElementById("profile_image").files[0];
		let cover_image = document.getElementById("cover_image").files[0];
		let work_proof = document.getElementById("work_proff").files[0];
        
        console.log(phone)
		console.log(profession)
		console.log(username)
		console.log(email)
		console.log(company_name)
		console.log(address)
		console.log(pincode)
		console.log(pin_id)
		console.log(password)
		console.log(title)
		console.log(work_description)
		console.log(profile_image)
		console.log(cover_image)
		console.log(work_proof)

		var form = new FormData()
		form.append("phone",phone)
		form.append("profession",profession)
		form.append("username",username)
		form.append("email",email)
		form.append("company_name",company_name)
		form.append("address",address)
		form.append("pincode",pincode)
		form.append("pin_id",pin_id)
		form.append("password",password)
		form.append("title",title)
		form.append("work_description",work_description)
		form.append("profile_image",profile_image)
		form.append("cover_image",cover_image)
		form.append("work_proof",work_proof)


		$.ajax({
			url:`https://test.1ounce.in/connect/signup/`,
			data:form,
			type:"POST",
			processData:false,
			contentType:false,
			success: function(response) {
				console.log(response)
				console.log("Done with Post")
			},
			error: function(response) {
                 alert("Fail")
           }
		})





	}