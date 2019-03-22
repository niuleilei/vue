new Vue({
	el:"#cart",
	data:{
		loadList:[],
		checkAllFlag:false,
		total:0,
		deleteList:false,
		curr:0
	},
	//页面加载完成执行
	mounted:function(){
		this.$nextTick(function(){
			this.load()
		})
	},
	filters:{
		price:function(value){
			return '￥'+value.toFixed(2)+'元'
		}
	}
	,
	methods:{
		load:function(){
			var _this=this;
			this.$http.get('data/cartData.json').then(function(res){
				_this.loadList=res.data.result.list;
			})
		},
		changeNum:function(product,boolean){
			if(boolean){
//				this.loadList.forEach(function(item){
//					item.productQuantity--
//				})
                product.productQuantity++
			}else{
				product.productQuantity--;
				if(product.productQuantity<1){
					product.productQuantity=1
				}
			}
			this.totalPrice()
	},
	//单选
	setcheck:function(item){
		if(typeof item.checked=='undefind'){
			item.checked=true;
			console.log(item.checked)
		}else{
			item.checked=!item.checked
			console.log(item.checked)
		}
		this.totalPrice()
	},
	//全选  取消全选
	checkAll:function(flag){
		var _this=this;
		this.checkAllFlag=flag;
		this.loadList.forEach(function(item,index){
			if(typeof item.checked=='undefined'){
				_this.$set(item,'checked',_this.checkAllFlag)
			}else{
				item.checked=_this.checkAllFlag
			}
		})
		this.totalPrice()
	},
   //总价计算
    totalPrice:function(){
    	var _this=this;
    	this.total=0
    	this.loadList.forEach(function(item){
    		if(item.checked){
    			_this.total+=item.productPrice*item.productQuantity
    		}
    	})
    },
    //删除
    delList:function(item){
    	this.deleteList=true;
    	this.curr=item;
    	console.log(item)
    },
    delCheckAllFlag:function(){
    	this.deleteList=false;
    	var index = this.loadList.indexOf(this.curr);
    	this.loadList.splice(index,1);
    	this.totalPrice()
    }
  
	}
	
})