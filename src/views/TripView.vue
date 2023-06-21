<template>
    <div class="view_wrap">
        <h1>Fly To High✈</h1>
        <div id="list_area">
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>내용</th>
                        <th>등록일</th>
                        <th>이미지</th>
                        <th>
                            <button @click="openTripInfoPopup()">게시글 추가</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="trip in list" :key="trip.btiSeq">
                    <td>{{ trip.btiSeq }}</td>
                    <td>{{ trip.btiTitle }}</td>
                    <td>{{ trip.btiContent }}</td>
                    <td>{{ trip.btiRegDt }}</td>
                    <td style="width: 250px">
                        <div class="trip_img"
                        :style="{'background-image': 'url(\'http://localhost:9988/images/trip/'+trip.btiImg+'\')'}">
                        </div>
                    </td>
                    <td>
                        <button @click="deleteTrip(trip.btiSeq)">삭제</button>
                    </td>
                    </tr>
                </tbody>
            </table>
    </div>
    <TripInfoPopup v-if="tripInfoPopup" :mode="mode" @closeTripInfoPopup="closeTripInfoPopup"/>
    </div>
</template>

<script>
import TripInfoPopup from '@/components/TripInfoPopup.vue'
export default{
    name:"TripView",
    components:{TripInfoPopup},
    data(){
        return{
            list:null, currentPage:0, totalPage:0, keyword:null, trip:null,popup:false,
            mode:"추가", tripInfoPopup:false  
        }
    },
    created(){
        this.loadTripList()
},
methods: {
        add(){
            this.popup = true
        },
        openTripInfoPopup(){
            this.tripInfoPopup = true
            this.mode = "추가"
        },
        closeTripInfoPopup(){
            this.tripInfoPopup = false
        },
        deleteTrip(tripNo){
            if(!confirm("해당 게사글을 삭제 하시겠습니까? \n 아 작업은 되돌릴 수 없습니다.")) return
            let token = sessionStorage.getItem("userToken")
            this.$http.delete("/api/trip/"+tripNo,{
                headers:{Authorization: `Bearer ${token}`}
            })
            .then((r)=>{
                alert(r.data.message)
                if(r.data.status){
                    location.reload()
                }
            })

        },
        loadTripList(){
            let token = sessionStorage.getItem('userToken')
            this.$http.get("/api/trip/list",{
                headers: {
                        Authorization:`Bearer ${token}`
                },
                param:{
                    page:this.currentPage,
                    keyword:this.keyword
                }
            })
            .then((r)=>{
                this.currentPage = r.data.currentPage
                this.totalPage = r.data.totalPage
                this.list = r.data.list
                console.log(this.list)
            })
        }
    }
}
</script>
<style>
 .view_wrap tr {box-shadow: 0; transition:0.2s; }
    .view_wrap tr:hover {
        box-shadow: 0 2px 5px #00000055;
        background-color: #f7f7f7;
    }
    .view_wrap {width: 960px; margin:0 auto; position: relative;}
    .view_wrap h1 {
        font-size: 24px; font-weight: bold; padding:30px 0;
    }
    .view_wrap table {width: 100%;}
    .trip_img {width: 130px; height: 130px; background-size: 100% auto;
        display: inline-block; border-radius: 5%; background-position: center top;
    }
    .view_wrap tbody tr td{text-align: center; vertical-align: middle; height: 100%;}
</style>