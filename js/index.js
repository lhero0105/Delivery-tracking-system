// axios.get("http://info.sweettracker.co.kr/api/v1/companylist?t_key=B1cjt4phoTTzd0FiOFEIGg")
// 공공 api 를 땡겨온 후 차단당하지 않게 json에 저장한다. <필수>
let select = [];
function appendContent(e) {
    let option = document.createElement("option");

    // console.log(e.Name)
    option.textContent = e.Name
    option.setAttribute("value", e.Code)
    document.querySelector("#t_Code").appendChild(option)
}
let t_Code = "04";
let t_invoice = "";
let t_name = "CJ대한통운";
let detail = [];
document.querySelector(".submit-btn").addEventListener("click", function () {
    // alert()
    if (t_invoice === "") {
        alert("운송장 번호를 입력해주세요.")
        document.querySelector(".t_invoice").focus()
        return;
    } else {
        trackingList(t_Code, t_invoice, t_name)
    }
})

function trackingList() {
    console.log(t_Code, t_invoice)
    axios.get("data/Trackinginfo.json")
    // axios.get(`http://info.sweettracker.co.kr/api/v1/trackingInfo?t_code=${t_Code}&t_invoice=${t_invoice}&t_key=B1cjt4phoTTzd0FiOFEIGg`)
        .then(function (res) {
            if(res.data.code == "104"){
                alert(res.data.msg);
                return;
            }
            detail = res.data
            console.log(res)
            document.querySelectorAll(".desc .top > *, .desc .center > *, .desc .bottom > *").forEach(el=>{
                // ,를 이용하여 클린코딩
                el.remove()
            })
            createEle("h3",t_name, ".desc .top")
            createEle("p",detail.invoiceNo, ".desc .top")
            createEle2(".desc .center", detail.level);
            createEle3(".desc .bottom", detail.trackingDetails);
            // document.textContent = e.trackingDetails
        })
}
let postList = ["상품인수", "상품이동중", "배송지도착", "배송출발", "배송완료"];
let maxCnt = 6;



function createEle(e,desc,parent){
    let ele = document.createElement(e);
    ele.textContent = desc;
    document.querySelector(parent).appendChild(ele);
}
// 재사용성이 좋은 코드

function createEle2(parent, level){
    // alert(level)　
    let html = `<ul class="info-back">`;
    for(let i = 1; i < maxCnt; i++){
        let level_ = (level > 5) ? 5 : level
        let active = (i === level_) ? "on" : "off";
        // 삼항연산자에서 참일 때만 (거짓없이) >> &&
        let activeClass = (i === level_) && "active"
        // http://info.sweettracker.co.kr/static/images/sky/ic_sky_delivery_step1_off.png
        html += `<il><img src="http://info.sweettracker.co.kr/static/images/sky/ic_sky_delivery_step${i}_${active}.png"><span class="${activeClass || ''}">${postList[i-1]}</span></li>`
        // activeClass 이면 false 이면 '' 동작
    }
    html += '</ul>';
    document.querySelector(parent).innerHTML = html;
}
//console 찍으면 levet ex)1,2,3,4,5 로 뜸

function createEle3(parent, details){
    console.log(details)
    // 정보가 뒤바껴있음
    details.reverse().forEach(el =>{
        let div = document.createElement("div");
        div.className = "tracking-state";

        createEle4("span", el.where, div)
        createEle4("span", el.kind, div)
        createEle4("p", el.timeString, div)
        document.querySelector(parent).appendChild(div)
    })
}

function createEle4(e, desc, el){
    let ele = document.createElement(e);
    ele.textContent = desc;
    el.appendChild(ele);
}

document.querySelector("#t_Code").addEventListener("change", function () {
    t_Code = this.value;
    // alert(t_Code)
    let selection = this.options[this.selectedIndex];
    // selectedIndex - 옵션 내의 몇번째 글자를 가져옵니다. (첫번쨰가 0번)
    // alert(selection)
    console.log(this.option)
    // 옵션을 다가져옵니다.
    console.log(this.selectedIndex)
    t_name = selection.textContent
})

document.querySelector(".t_invoice").addEventListener("input", function () {
    // console.log("ㅇㅁㅇㅈ")
    // console.log(value)
    t_invoice = this.value
    this.value = this.value.replace(/[^0-9]/g, '');
    // 숫자만 입력하는 코드 (안 외워도됨)
})

const $btn = document.querySelectorAll(".btn")
$btn.forEach((el, i) => {
    el.addEventListener("click", function (){
        // alert(i)
        if (i == 0) {
            filterData("false")
            // 국내 클릭
            // false 제이슨 저장값
        } else {
            filterData("true")
            // 국외 클릭
            // true
        }
    })
})

function filterData(i) {
    document.querySelectorAll("#t_Code > option").forEach(el => {
        el.remove()
    })
    // alert(i);
    let filters = select.filter(data => data.International === i);
    // console.log(filters)
    optionData(filters)
}
function optionData(data) {
    console.log(data)
    data.forEach(e => {
        let option = document.createElement("option");

        // console.log(e.Name)
        option.textContent = e.Name
        option.setAttribute("value", e.Code)
        document.querySelector("#t_Code").appendChild(option)
    })
}
// https://kin.naver.com/qna/detail.naver?d1id=8&dirId=81302&docId=449194685&qb=7YOd67Cw7KGw7ZqM&enc=utf8&section=kin&rank=9&search_sort=0&spq=0
// 참고



axios.get("data/company.json")
    .then(function (res) {
        console.log(res)
        select = res.data;
        console.log(select)
        res.data.map((e, i) => {
            appendContent(e)
            // console.log(e.Name)
        })
    })
    .catch(function (error) {
        console.log(error)
    })