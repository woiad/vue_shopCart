var nm = new Vue({
	el:'.container',
	data:{
		limitNum:3,
		flag:true,
		currentIndex:0,
		shoppingMethod:1,
		show:false,
		delNum: 0,
		editNum:0,
		editShow:false,
		newName:null,
		newAddress:null,
		newTel:null,
		addressList:[]
	},
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum)
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.getAddresslist();
		})
	},
	methods:{
		getAddresslist:function(){
			var _this = this;
			this.$http.get('data/address.json').then(function(response){
				var res = response.data;
				if(res.status=="0"){
					_this.addressList = res.result;
				}
			})
		},
		loadMore:function(){
			if(this.flag){
				this.limitNum = this.addressList.length;
				this.flag = false;
			}else{
				this.limitNum =3;
				this.flag = true;
			}
		},
		setDefault:function(addressId){
			this.addressList.forEach(function(address,index){
				if(address.addressId==addressId){
					address.isDefault = true;
				}else{
					address.isDefault = false;
				}
			})
		},
		delAddress:function(index){
			this.show=true;
			this.delNum = index;
			console.log(this.delNum)
		},
		confirmDel:function(){
			_this = this
			this.addressList.forEach(function(item,index){
				if(_this.delNum==index){
					_this.addressList.splice(index,1);
					_this.show=false;
				}
			})
		},
		editAddress:function(index){
			this.editNum = index;
			this.editShow = true;
		},
		saveNewAddress:function(){
			this.addressList[this.editNum].userName=this.newName;
			this.addressList[this.editNum].streetName = this.newAddress;
			this.addressList[this.editNum].tel = this.newTel;
			this.editShow = false;
		}
	}
})
