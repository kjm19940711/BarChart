
	//模拟数据
function paint_linechart(Num,xname,yname,width,height,left,top,div)
{
	//定义画布
	var dataset=Num;
	var xMarks=[];
	for(i=0;i<dataset.length;i++){
		xMarks[i]=i;
	}
	var w=width;
	var h=height;
	var padding=30;
	var paddings={left:30,top:30,right:30,bottom:30}
	var svg=div.append("svg")
		.attr("id","LineSvg")
		.attr("width",w)
		.attr("height",h)
		.style("position","absolute")
		.style("left",left+"px")
		.style("top",top+"px");

	//添加背景
	
	//横坐标轴比例尺
	var xScale = d3.scale.linear()
		.domain([0,Num.length-1])
		.range([padding,w-padding]);
	//纵坐标轴比例尺
	var yScale = d3.scale.linear()
		.domain([0,d3.max(Num)])
		.range([h-padding,padding]);
	//定义横轴
	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom").ticks(Num.length);
	//添加横坐标轴并通过编号获取对应的横轴标签
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + 0 + "," + (h - paddings.bottom) + ")")
		.call(xAxis)
		.style("-webkit-user-select","none")
		.append("text")
		.attr("class", "label")
		.attr("x", w-padding/2)
		.attr("y", 30)
		.style("text-anchor", "end")
		.style("-webkit-user-select","none")
		.text(xname); 
	//定义纵轴
	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left").ticks(10);
	//添加纵轴
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding + "," + 0 + ")")
		.call(yAxis)
		.style("-webkit-user-select","none")
		.append("text")
		.attr("class","label")
		.attr("x",0)
		//.attr("transform", "rotate(90)")
		.attr("transform","translate("+(0)+","+(0)+")")
		.attr("y", 15)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.style("-webkit-user-select","none")
		.text(yname);
	//添加折线
	var line = d3.svg.line()
		.interpolate("monotone")
		.x(function(d,i){return xScale(i);})
		.y(function(d){return yScale(d);});
	var path=svg.append("path")
		.attr("d", line(Num))
		.style("fill","#F00")
		.style("fill","none")
		.style("stroke-width",1)
		.style("stroke","rgb(57,153,9)")
		.style("stroke-opacity",0.9);
	//添加系列的小圆点
	svg.selectAll("circle")
		.data(Num)
		.enter()
		.append("circle")
		.attr("cx", function(d,i) {
			return xScale(i);
		})
		.attr("cy", function(d) {
			return yScale(d);
		})
		.attr("r",5)
		.style("fill","rgb(191,38,207)");
	svg.on("mousedown",function(){
			var MouseX=d3.event.x;
			var MouseY=d3.event.y;
			if (MouseX>=padding+left&&MouseX<=w-padding+left&&MouseY>=padding+top&&MouseY<=h+top){
			d3.select("#LineSvg_cover_x").remove();
			d3.select("#LineSvg_cover_x_assist").remove();
			d3.select("#LineSvg_cover_x_").remove();
			d3.select("#Line_Svg_Cover_Remove").remove();
			d3.select("body").append("svg")
					.attr("id","LineSvg_cover_x")
					.style("width",0+"px")
					.style("height",h-2*padding+"px")
					.style("background","#FF7F50")
					.style("position","absolute")
					.style("top",top+padding+"px")
					.style("left",MouseX+"px")
					.style("opacity",0.3);
			d3.select("body").append("svg")
					.attr("id","LineSvg_cover_x_")
					.style("width",0+"px")
					.style("height",padding-10+"px")
					.style("background","#000000")
					.style("position","absolute")
					.style("top",top+height-padding+"px")
					.style("left",MouseX+"px")
					.style("opacity",0.2);
			d3.select("body").append("svg")
				.attr("id","LineSvg_cover_x_assist")
				.style("position","absolute")
				.style("width",1000+"px")
				.style("height",1000+"px")
				.style("left",0+"px")
				.style("top",0+"px")
				.on("mousemove",function(){
					
					{
						if(d3.event.x>=MouseX&&d3.event.x<=w-padding+left+2){
							d3.select("#LineSvg_cover_x").style("width",d3.event.x-MouseX+"px");
							d3.select("#LineSvg_cover_x_").style("width",d3.event.x-MouseX+"px");
						}
						
					}
				})
				.on("mouseup",function(){
					if(d3.event.x>=MouseX&&d3.event.x<=w-padding+left+2)
					{
						d3.select("#LineSvg_cover_x").style("width",d3.event.x-MouseX+"px");
						d3.select("#LineSvg_cover_x_").style("width",d3.event.x-MouseX+"px");
						Line_Svg_Cover_Remove(d3.event.x,top+h-padding);
					}
				d3.select(this).remove();
				});
				
			}
			else if(MouseX<padding+left&&MouseX>=left)
			{
			d3.select("#LineSvg_cover_y").remove();
			d3.select("#LineSvg_cover_y_assist").remove();
			d3.select("#LineSvg_cover_y_").remove();
			d3.select("body").append("svg")
					.attr("id","LineSvg_cover_y")
					.style("width",w-2*padding+"px")
					.style("height",0+"px")
					.style("background","#FF7F50")
					.style("position","absolute")
					.style("top",MouseY+"px")
					.style("left",left+padding+"px")
					.style("opacity",0.2);
			d3.select("body").append("svg")
					.attr("id","LineSvg_cover_y_")
					.style("width",padding-10+"px")
					.style("height",0+"px")
					.style("background","#000000")
					.style("position","absolute")
					.style("top",MouseY+"px")
					.style("left",left+10+"px")
					.style("opacity",0.2);
			d3.select("body").append("svg")
				.attr("id","LineSvg_cover_y_assist")
				.style("position","absolute")
				.style("width",1000+"px")
				.style("height",1000+"px")
				.style("left",0+"px")
				.style("top",0+"px")
				.on("mousemove",function(){
					
					{
						
						if(d3.event.y>=MouseY&&d3.event.y<=top+h-padding){
							d3.select("#LineSvg_cover_y").style("height",d3.event.y-MouseY+"px");
							d3.select("#LineSvg_cover_y_").style("height",d3.event.y-MouseY+"px");
						}
						
					}
				})
				.on("mouseup",function(){
					if(d3.event.y>=MouseY&&d3.event.y<=top+h-padding)
					{
						d3.select("#LineSvg_cover_y").style("height",d3.event.y-MouseY+"px");
						d3.select("#LineSvg_cover_y_").style("height",d3.event.y-MouseY+"px");
					}
				d3.select(this).remove();
				});

			}
		});
function Line_Svg_Cover_Remove(left,top){
	var circle=div.append("svg")
		.attr("id","Line_Svg_Cover_Remove")
		.style("position","absolute")
		.style("left",left+"px")
		.style("top",top+"px")
		.style("width",12+"px")
		.style("height",12+"px")
		.on("mousedown",function(){
				d3.select("#LineSvg_cover_y").remove();
				d3.select("#LineSvg_cover_y_assist").remove();
				d3.select("#LineSvg_cover_y_").remove();
				d3.select("#LineSvg_cover_x").remove();
				d3.select("#LineSvg_cover_x_assist").remove();
				d3.select("#LineSvg_cover_x_").remove();
				d3.select("#Line_Svg_Cover_Remove").remove();
		})
		.append("circle")
		.attr("id","Bar_circle_Cover_Remove")
        .attr('cx',5)
        .attr('cy',5)
        .attr('r',4)
        .attr('stroke','red')
	    .attr('stroke-width',2)
	    .style('fill','red');
};
}