<template>
    <div class="popup_wrap">
        <div class="popup">
            <h1>글 쓰기</h1>
            <div class="img_side">
                <div class="img" style="width: 250px; height: 250px; border: 1px solid #000;" ref="imgbox">
            </div>
            <input type="file" accept="image/*" @change="imageChange">
            </div>
            <div class="content_side">
                <p>제목</p>
                <input type="text" v-model="title">
                <p>내용</p>
                <input type="text" v-model="content">
            </div>
            <button v-if="mode == '추가'" @click="save">저장</button>
            <button @click="closePopup">&times;</button>
        </div>
    </div>
</template>
<script>
export default{
    name:"TripInfoPopup",
    props:{mode:String},
    data(){
        return{
            imgData:"", title:"", content:""
        }
    },
    methods:{
        closePopup(){
            if(!confirm("작성을 취소하시겠습니까? \n 정보는 저장되지 않습니다."))return
            this.$emit("closeMusicInfoPopup")
        },
        save(){
           const token = sessionStorage.getItem('userToken')
           const formData = new FormData()
           
           formData.append("title", this.title)
           formData.append("content", this.content)
           formData.append("img", this.imgData)

           this.$http.put("/api/trip", formData,{
            headers:{
                Authorization: `Bearer ${token}`
            },
           })
           .then((r)=>{
            console.log(r);
            if(r.data.status){
                alert("게시글이 등록되었습니다.")
                location.reload()
            }
            else{
                alert(r.data.message)
            }
           })
           .catch((e)=>{
            console.log(e)
            alert("게시글 작성 중 오류가 발생했습니다.")
           })
        },
        imageChange(event){
            const imgbox = this.$refs.imgbox
            if(event.target.files && event.target.files[0]){
                const reader = new FileReader()
                reader.addEventListener("load",function(e){
                    imgbox.style.backgroundImage = `url('${e.target.result}')`
                    imgbox.style.backgroundSize = '100% auto'
                    imgbox.style.backgroundPosition = 'center'
                })
                this.imgData = event.target.files[0]
                reader.readAsDataURL(this.imgData)
            }
            else{
                this.imgData = imgbox.style.backgroundImage=""
            }
        }
    }
}
</script>

<style scoped>
    .img{border: 1px solid #ccc; box-sizing: border-box; background-repeat: no-repeat;}
</style>