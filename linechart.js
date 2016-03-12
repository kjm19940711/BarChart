/**
 * Created by Administrator on 2016/3/6.
 */


function paint_linechart(Num,xname,yname,width,height,left,top,div)
{
	
    var linechart=div.append("div").attr("class","linechart_div")
    	.style("background","#000000")
    	.style("position","absolute")
    	.style("opacity",0.6)
        .style("left",left+"px")
        .style("top",top+"px")
        .style("width",width+"px")
        .style("height",height+"px")
        .style("border-radius","8px")

    var linechartsvg=linechart.append("svg")
        .style("width","100%")
        .style("height","100%")
        .style("-webkit-user-select","none");

    //画布周边的空白
	var padding={left:30,top:30,right:30,bottom:30}
	//定义一个数组
	var dataset =(Num);
	//x轴的比例尺
	var xScale = d3.scale.ordinal()
		.domain(d3.range(dataset.length))
		.rangeRoundBands([0, width - padding.left - padding.right]);
		
	//y轴的比例尺
	var yScale = d3.scale.linear()
		.domain([0,Math.round(d3.max(dataset)*1.2)])
		.range([height - padding.top - padding.bottom, 0]);
	//定义x轴
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");
		
	//定义y轴
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");

	//矩形之间的空白
	var rectPadding = 2;
	//添加x轴
	linechartsvg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
		.call(xAxis)
		.style("fill","white")
		.append("text")
		.attr("class", "label")
		.attr("x", width-padding.left-padding.right/2)
		.attr("y", 25)
		.style("text-anchor", "end")
		.style("-webkit-user-select","none")
		.text(xname);
		
	//添加y轴
	linechartsvg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.call(yAxis)
		.style("fill","white")
		.append("text")
		.attr("class","label")
		.attr("x",0)
		//.attr("transform", "rotate(90)")
		.attr("transform","translate("+(0)+","+(-padding.bottom)+")")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("-webkit-user-select","none")
		.text(yname);




    var leftpad=30,bottpad=30,
        rightpad=30,
        chartwidth=width-leftpad-rightpad,
        chartheight=height-bottpad;
    var data=[];
    for (var i=0;i<Num.length;i++)
    {
    	data.push([i+1,Num[i]]);
    }

    //linechartsvg.append("rect")
    //    .attr("x",260)
    //    .attr("y",20)
    //    .attr("rx",5)
    //    .attr("ry",5)
    //    .style("width",100).style("height",3)
    //    .style("fill","rgba(255,255,255,0.8)")
    //linechartsvg.append("rect")
    //    .attr("class","parameter_bar")
    //    .attr("x",260)
    //    .attr("y",12)
    //    .attr("rx",5)
    //    .attr("ry",5)
    //    .style("width",5).style("height",20)
    //    .style("fill","rgba(255,255,255,0.8)")
    //    .on("mousedown",function(){
    //        div.append("svg").style("position","absolute")
    //            .style("width","1000px")
    //            .style("left",left+"px")
    //            .style("top",top+"px")
    //            .style('height',"1000px")
    //            .on("mousemove",function(){
    //                if(d3.mouse(this)[0]<260){
    //                    d3.select(".parameter_bar").attr("x",260)
    //                    return
    //                }
    //                if(d3.mouse(this)[0]>355){
    //                    d3.select(".parameter_bar").attr("x",355)
    //                    return
    //                }
    //                d3.select(".parameter_bar").attr("x",d3.mouse(this)[0])
    //                console.log(parseInt((d3.mouse(this)[0]-260)/15))
    //            })
    //            .on("mouseup",function(){
    //                d3.select(this).remove();
    //            })
    //    })


    var xmax=0,ymax= 0,
        step=data.length,
        foot=chartwidth/step;
    for(var i=1;i<data.length;i++){
        if(xmax<data[i][0])
            xmax=data[i][0]
        if(ymax<data[i][1])
            ymax=data[i][1]
    }
    ymax=ymax*1.2;
    for (var i=0;i<=Math.round(d3.max(Num)*1.2);i++)
    {
    	linechartsvg.append("line")
    		.attr("x1",leftpad)
    		.attr("y1",chartheight-((chartheight-padding.top)/Math.round(d3.max(Num)*1.2))*i)
    		.attr("x2",width-rightpad)
            .attr("y2",chartheight-((chartheight-padding.top)/Math.round(d3.max(Num)*1.2))*i)
            .style("stroke","rgb(230,230,230)")
            .style("stroke-width","0.2");
    }
    //x y name
    /*for(var i= 0;i<=6;i++){
        linechartsvg.append("line")
            .attr("x1",leftpad)
            .attr("y1",chartheight-height/6*i)
            .attr("x2",width-rightpad)
            .attr("y2",chartheight-height/6*i)
            .style("stroke","rgb(230,230,230)")
            .style("stroke-width","0.2")
        linechartsvg.append("line")
            .attr("x1",leftpad+chartwidth/6*i)
            .attr("y1",chartheight)
            .attr("x2",leftpad+chartwidth/6*i)
            .attr("y2",chartheight+5)
            .style("stroke","rgb(230,230,230)")
            .style("stroke-width","0.3")
        linechartsvg.append("text")
            .style("fill","rgb(255,255,255)")
            .attr("x",leftpad+chartwidth/6*i-8)
            .attr("y",chartheight+20)
            .text(parseInt(step/6*i))
        linechartsvg.append("text")
            .style("fill","rgb(255,255,255)")
            .attr("x",10)
            .attr("y",chartheight-height/6*i+5)
            .text(parseInt(ymax/6*i))
    }*/
    //data
    var points=""
    var Line_begin_x=(xScale.rangeBand() - rectPadding)/2+rectPadding/2;
    for(var i=0;i<step;i++){

        points=points+(Line_begin_x+leftpad+xScale.rangeBand()*i)+","+(chartheight-((chartheight-padding.top)/Math.round(d3.max(Num)*1.2))*Num[i])+" "
    }
    linechartsvg.append("polyline")
        .attr("points",points)
        .style("fill","none")
        .style("stroke","rgb(255,255,255)")
        .style("stroke-width","1.3")

    var detailwidth=100,detailheight=60;
    var selectareaflag=false;
    var SelectFlagX=false;
    linechartsvg.on("mousemove",function(){
            linechartsvg.selectAll(".chartmouseover").remove();
            linechartsvg.selectAll(".chartmouseoverx").remove();
            if((data[parseInt((d3.mouse(this)[0]-leftpad)/foot)]!=undefined)&&((parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand()))>=0)){
            linechartsvg.append("circle")
                .attr("class","chartmouseover")
                .style("fill","rgba(255,255,255,0.5)")
                .attr('cx', Line_begin_x+leftpad+xScale.rangeBand()*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand())))
                .attr('cy', (chartheight-((chartheight-padding.top)/Math.round(d3.max(Num)*1.2))*Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand()))]))
                .attr('r', 8)
            linechartsvg.append("circle")
                .attr("class","chartmouseover")
                .style("fill","skyblue")
                .attr('cx', Line_begin_x+leftpad+xScale.rangeBand()*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand())))
                .attr('cy', (chartheight-((chartheight-padding.top)/Math.round(d3.max(Num)*1.2))*Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand()))]))
                .attr('r', 5)
                .style("stroke","rgb(255,255,255)")
                .style("stroke-width","1")
            linechartsvg.append("rect")
                .attr("class","chartmouseover")
                .attr("x",Line_begin_x+leftpad+xScale.rangeBand()*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand()))-detailwidth/2)
                .attr("y",(chartheight-((chartheight-padding.top)/Math.round(d3.max(Num)*1.2))*Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand()))])-detailheight-10)
                .attr("rx",5)
                .attr("ry",5)
                .style("width",detailwidth).style("height",detailheight)
                .style("fill","rgba(255,255,255,0.8)")
            linechartsvg.append("text").attr("class","chartmouseover")
                .style("fill","rgba(0,0,0)")
                .attr("x",Line_begin_x+leftpad+xScale.rangeBand()*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand()))-detailwidth/2+10)
                .attr("y",(chartheight-((chartheight-padding.top)/Math.round(d3.max(Num)*1.2))*Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand()))])-detailheight-10+detailheight-35)
                .text(xname+" : "+data[parseInt((d3.mouse(this)[0]-leftpad)/foot)][0])
            linechartsvg.append("text").attr("class","chartmouseover")
                .style("fill","rgba(0,0,0)")
                .attr("x",Line_begin_x+leftpad+xScale.rangeBand()*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand()))-detailwidth/2+10)
                .attr("y",(chartheight-((chartheight-padding.top)/Math.round(d3.max(Num)*1.2))*Num[(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand()))])-detailheight-10+detailheight-10)
                .text(yname+" : "+data[parseInt((d3.mouse(this)[0]-leftpad)/foot)][1])
            }
            if(selectareaflag){
                d3.select(".chartselctarea")
                    .style("width",Line_begin_x+leftpad+xScale.rangeBand()*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand()))-d3.select(".chartselctarea").attr("x"));
                    d3.select(".chartselctareax")
                    .style("width",Line_begin_x+leftpad+xScale.rangeBand()*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand()))-d3.select(".chartselctarea").attr("x"));
            }
        })
        .on("mousedown",function(){
            d3.selectAll(".chartselctarea").remove()
            linechartsvg.append("rect")
                .attr("class","chartselctarea")
                .attr("x",Line_begin_x+leftpad+xScale.rangeBand()*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand())))
                .attr("y",0)
                .style("width",0)
                .style("height",chartheight)
                .style("fill","rgba(255,255,255,0.5)")
            linechartsvg.append("rect")
                .attr("class","chartselctareax")
                .attr("x",Line_begin_x+leftpad+xScale.rangeBand()*(parseInt((d3.mouse(this)[0]-leftpad-Line_begin_x)/xScale.rangeBand())))
                .attr("y",chartheight)
                .style("width",0)
                .style("height",20)
                .style("fill","rgba(0,255,255,0.2)")
            selectareaflag=true;
            SelectFlagX=true;
        })
        .on("mouseup",function(){
            selectareaflag=false;
            SelectFlagX=false;
        })


}
