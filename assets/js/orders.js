var search = "";
var dateStart = null;
var dateEnd = null;
var inDateFrom = document.getElementById("inDateFrom");
var inDateTo = document.getElementById("inDateTo");
var inSearch = document.getElementById("search");
var base_url = "http://35.224.241.141/reception/api/";

$(document).ready(function() {
    
    $(function() {

      var start = moment().subtract(3, 'days');
      var end = moment();
  
      function cb(start, end) {
          $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
          dateStart =  start.format('YYYY-MM-DD')+" 00:00:00";
          dateEnd = end.format('YYYY-MM-DD')+" 23:59:59.999999";


//          getVisitors(dateStart, dateEnd, search);
      }
  
      $('#reportrange').daterangepicker({
          startDate: start,
          endDate: end,
          ranges: {
             'Today': [moment(), moment()],
             'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
             'Last 7 Days': [moment().subtract(6, 'days'), moment()],
             'Last 30 Days': [moment().subtract(29, 'days'), moment()],
             'This Month': [moment().startOf('month'), moment().endOf('month')],
             'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
          }
      }, cb);
  
      cb(start, end);
  
    });

    
  }); 

  function getVisitors() {
    search = inSearch.value;
    console.log("query: "+search+" "+dateStart+" "+dateEnd);
    var api = base_url+"ss_visitors?from="+dateStart+"&to="+dateEnd+"&search="+search;
    $.get(api, function(data, status){
        console.log("Data: " + data + "\nStatus: " + status);
        console.log(data);
        if(status == "success") {

            if(data.success) {
                if(data.hasOwnProperty('data')) {
                    var list = '<table class="table">'+
                    '<thead class=" text-info">'+
                      '<th>Photo</th>'+
                      '<th>Name</th>'+
                      '<th>ID Card </th>'+
                      '<th>Mobile</th>'+
                    '</thead>'+
                    '<tbody>' ;
                
                    for (i in data.data) {
                        
                        var visitor = data.data[i];

                        list+= "<tr>"+
                        "<td><img  src='"+base_url+"visitor/"+visitor.visitor_photo.substring(15)+"'  width='100' height='100'></td>"+
                        "<td>"+visitor.name+"</td>"+
                        "<td>"+visitor.card_no+"</td>"+
                        "<td>"+visitor.mobile+"</td>"+
                        "</tr>"

                    }

                    list+"</tbody> </table>";
                    document.getElementById("visitor_list").innerHTML = list;

                }else{
                    var no_data = "<div align='center'>"+
                                    "<img style='margin-top: 50px;' src='/static/images/robot-2.png' width='100' height='100' />"+
                                    "<h4 style='margin-top: 30px;' >No visitors found</h4>"+
                                "</div>"
                    document.getElementById("visitor_list").innerHTML = no_data;
                }
            }else{
                alert(data.message);
            }

        }else {
            alert("cannot load data!");
        }

    });

  }
  

function formatDate(date) {   yr = date.getFullYear(),
    month   = date.getMonth(),
    day     = date.getDate(),
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    newDate = day + ' ' + months[month] + ', ' + yr;return newDate;
}

function formatTime(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; 
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var newTime = hours + ':' + minutes + ' ' + ampm;
    return newTime;
}