var $mainContentFrame = $('#mainContentFrame');
function getData() {
    $.ajax({
        url:'http://47.92.72.218:8080/brsj/gis/get-contract.htm',
        type:'GET',
        data:pageView.getParams()
        // data:'{"pageIndex":1,"pageSize":10}'
    }).done(function(responseData){

        var responseData = JSON.parse(responseData);
        var dataList = responseData.data;

        pageView.refresh(responseData.total);
        var trList = [];

        var $tableList = $('.table-list',$mainContentFrame);
        for(var i=0,len=dataList.length;i<len;i++) {
            trList.push('<tr>');
            trList.push('<td class="num-order">'+dataList[i].id+'</td>');
            trList.push('<td>'+dataList[i].code+'</td>');
            trList.push('<td>'+dataList[i].customer+'</td>');
            trList.push('<td>'+dataList[i].content+'</td>');
            trList.push('<td><button class="btn-normal">提醒预约</button> </td>');
            trList.push('</tr>');
        }
        $tableList.find('tbody').empty().append(trList.join(''));
    }).always(function(){
        pageView.enable();

    });
}

var  pageView = new PageView('#page_view', {
    defaultSize: 10,
    firstDisplay:true,
    lastDisplay:true,
    pageIndexName:'pageIndex',
    pageSizeName:'pageSize',
    onChange: getData
});
pageView.init();
getData();

//日历
var configObject ={
    format:'YYYY-MM-DD',
    singleDate:true,
    shortcuts:false
}
$('.start-date',$mainContentFrame).dateRangePicker(configObject);
$('.end-date',$mainContentFrame).dateRangePicker(configObject);
