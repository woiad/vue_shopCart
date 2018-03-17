var vm = new Vue({
	el:"#app",
	data:{
		productList:[],
		totalMoney:0,
		checkAll:false,
		money:20,
		delshow:false,
		currentItem:[]
	},
	filters:{
		formatMoney: function(value){
			return "￥"+value.toFixed(2)
		}
	},
	mounted:function(){
		this.$nextTick(function(){
			this.cartView()
		})
	},
	methods:{
		cartView: function(){
			var _this=this;
			this.$http.get("data/cartData.json",{"id":123}).then(function(res){
				console.log(res.data);
				_this.productList = res.data.result.list;
//				_this.totalMoney=res.data.result.totalMoney;
			})
		},
		changeMoney:function(product,way){
			if(way>0){
				product.productQuantity++;
			}else{
				product.productQuantity--;
				if(product.productQuantity<1){
					product.productQuantity = 1;
				}
			};
			this.calcTotalPrice()
		},
		selectedProduct: function(product){
			if(typeof product.checked=="undefined"){
//				Vue.set(product,"checked",true)
				this.$set(product,"checked",true)
			}else{
				product.checked = !product.checked
			};
			this.calcTotalPrice();
		},
		selectedProductAll: function(flag){
			this.checkAll = flag;
			var _this = this;
			this.productList.forEach(function(item,index){
				if(typeof item.checked == "undefined"){
					_this.$set(item,"checked",true)
				}else{
					item.checked=flag;
				}
			})
			this.calcTotalPrice()
//			for(var i=0;i<this.productList.length;i++){
//				if(this.productList[i].checked=="undefined"){
//					this.$set(this.productList[i],"checked",true)
//				}else{
//					this.productList[i].checked=flag;
//				}
//			}
			
	    },
	    calcTotalPrice:function(){
	    	var _this=this;
	    	_this.totalMoney=0;
	    	this.productList.forEach(function(item,index){
//	    		console.log(_this.totalMoney)
	    		if(item.checked){
	    			_this.totalMoney += parseInt(item.productPrice*item.productQuantity)
	    		}
	    	})
	    },
	    comfirmDele:function(item){
	    	this.delshow = true;
	    	this.currentItem=item;
	    },
	    delProduct:function(){
	    	var index = this.productList.indexOf(this.currentItem);
	    	this.productList.splice(index,1);
	    	console.log(this.productList);
	    	this.calcTotalPrice();
	    	this.delshow=false;
	    }
	}
})
Vue.filter('money',function(value,type){
	return  "￥"+value.toFixed(2)+type
})
