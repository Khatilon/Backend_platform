window.onload=function(){

   new Vue({
       el:"#app",
       data:{
            edit:false,
            nowSite:0,
            show:false,
            initialProduct:{
                title:'',
                category:'',
                content:'',
                description:'',
                imageUrl:'',
                enabled:false,
                origin_price:null,
                price:null,
                unit:'',
                option:{
                    tax:false,
                },
            },
            inputProduct:{
                title:'',
                category:'',
                content:'',
                description:'',
                imageUrl:'',
                enabled:false,
                origin_price:null,
                price:null,
                unit:'',
                option:{
                    tax:false,
                },
            },
            tempData:{},
            realData:[],
       },
       methods:{
            showTable(){
                this.show=true;
                if(this.show){
                    document.querySelector(".itemTable").classList.add("show");
                }
            },
            cancelTable(){
                this.show=false;
                document.querySelector(".itemTable").classList.remove("show");
            },
            insertData(){
                console.log(this.inputProduct);
                
                let newData=this.inputProduct;
                let time=(new Date()).getTime();

                this.$set(newData,'id',time);
                console.log(newData);
                this.realData.push(newData);
                console.log(this.realData);

                this.clearTable();
            },
            clearTable(){
                this.inputProduct=this.initialProduct;
                this.cancelTable();
            },
            editItem(data){
                this.showTable();

                this.edit=true;
                var i;
                this.tempData=JSON.parse(JSON.stringify(data));
                console.log(this.tempData);
                this.realData.forEach(function(element,index){
                    // console.log(element);
                    if(element.id===data.id){
                        console.log(`find it!! ${element.id}`);
                        i=index;
                    }
                })

                this.inputProduct=JSON.parse(JSON.stringify(this.realData[i])); 
                //Ray:這邊一定要放深層複製,否則會改到原本的realData。

                this.nowSite=i;
                
            },
            editComplete(){
                console.log(this.nowSite);

                this.realData[this.nowSite]=this.inputProduct;
                
                this.edit=false;
                this.clearTable();
            },
            deleteItem(id){
                var deleteSite;
                this.realData.forEach(function(element,index){
                    if(id===element.id){
                        deleteSite=index;
                    }
                })

                this.realData.splice(deleteSite,1);
            },
            cancle(){
                this.edit=false;
                this.clearTable();
            }
       }
   })

}