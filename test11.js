function Bar_Chart_fun(Num,xname,yname,width,height,left,top,div)
{


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
		.domain([0,d3.max(dataset)])
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



	var Bar_pery=((height-padding.top-padding.bottom)/(d3.max(dataset)));

	var svg = d3.select(".linechart_div")
		.append("svg")
		.attr("id","Bar_svg")
		.style("width", width+"px")
		.style("height", height+"px")
		.style("position","absolute")
		.style("left",left+"px")
		.style("top",top+"px")
		
		.on("mousedown",function(){
				var mousex=Math.round((d3.event.x-left-padding.left)/(xScale.rangeBand()))*(xScale.rangeBand())+left+padding.left+rectPadding/2;
				var Drag_x_value=Math.round((d3.event.x-left-padding.left)/(xScale.rangeBand()));
				var mousey=Math.round((d3.event.y-top-padding.top)/Bar_pery)*Bar_pery+top+padding.top;
				var Drag_y_value=d3.max(dataset)-Math.round((d3.event.y-top-padding.top)/Bar_pery);
				var MouseX=d3.event.x;
				var MouseY=d3.event.y;

				if (MouseX>left+padding.left&&MouseY<top+height-padding.top){
				
				d3.select("#Bar_svg_cover").remove();
				d3.select("#Bar_svg_cover_axis_x").remove();
				d3.select("#Bar_Svg_Cover_Remove").remove();
				d3.select(".linechart_div").append("svg")
					.attr("id","Bar_svg_cover")
					.style("position","absolute")
					.style("background","#000000")
					.style("top",padding.top+top+"px")
					.style("left",Math.max(padding.left+left,mousex)+"px")
					.style("width",0+"px")
					.style("height",height - padding.top - padding.bottom +"px")
					.style("opacity",0.2);
				d3.select(".linechart_div").append("svg")
					.attr("id","Bar_svg_cover_axis_x")
					.style("position","absolute")
					.style("background","#FF7F50")
					.style("top",top-padding.bottom+height+"px")
					.style("left",Math.max(padding.left+left,mousex)+"px")
					.style("width",0+"px")
					.style("height",padding.bottom-10 +"px")
					.style("opacity",0.3);
				d3.select("body").append("svg")
					.attr("id","Bar_svg_cover_assist")
					.style("position","absolute")
					.style("left",0+"px")
					.style("top",0+"px")
					.style("width",1000+"px")
					.style("height",1000+"px")
					.on("mousemove",function(){
						if (d3.event.x<width-padding.left+left)
						{
							d3.select("#Bar_svg_cover").style("width",d3.event.x-mousex+"px");
							d3.select("#Bar_svg_cover_axis_x").style("width",d3.event.x-mousex+"px");
							
						}

					})
					.on("mouseup",function(){
						if (d3.event.x<width-padding.left+left){
						d3.select("#Bar_svg_cover").style("width",Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand()+"px");
						d3.select("#Bar_svg_cover_axis_x").style("width",Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand()+"px");
						
						var Drag_x_value_End=Math.round((d3.event.x-mousex)/(xScale.rangeBand()))+Drag_x_value;
						if (Drag_x_value<=(Drag_x_value_End-1)){
						console.log(xname+":["+Drag_x_value+","+(Drag_x_value_End-1)+"]");
						Bar_Svg_Cover_Remove(Math.max(padding.left+left,mousex)+Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand(),top-padding.bottom+height);}
						}
						else{
						d3.select("#Bar_svg_cover").style("width",width-padding.left-mousex+left+"px");
						d3.select("#Bar_svg_cover_axis_x").style("width",width-padding.left-mousex+left+"px");
						
						var Drag_x_value_End=Math.round((width-padding.left-mousex+left)/(xScale.rangeBand()))+Drag_x_value;
						if (Drag_x_value<=(Drag_x_value_End-1)){
						console.log(xname+":["+Drag_x_value+","+(Drag_x_value_End-1)+"]");}
						Bar_Svg_Cover_Remove(width-padding.left+left,height-padding.bottom+top);
						}
						d3.select(this).remove();
					});
				}
				else if (MouseX>left+padding.left&&MouseY>=top+height-padding.top){
				d3.select("#Bar_svg_cover_axis_x").remove();
				d3.select("#Bar_svg_cover").remove();
				d3.select("#Bar_Svg_Cover_Remove").remove();
				d3.select(".linechart_div").append("svg")
					.attr("id","Bar_svg_cover")
					.style("position","absolute")
					.style("background","#000000")
					.style("top",padding.top+top+"px")
					.style("left",Math.max(padding.left+left,mousex)+"px")
					.style("width",0+"px")
					.style("height",height - padding.top - padding.bottom +"px")
					.style("opacity",0.2);
				d3.select(".linechart_div").append("svg")
					.attr("id","Bar_svg_cover_axis_x")
					.style("position","absolute")
					.style("background","#FF7F50")
					.style("top",top-padding.bottom+height+"px")
					.style("left",Math.max(padding.left+left,mousex)+"px")
					.style("width",0+"px")
					.style("height",padding.bottom-10 +"px")
					.style("opacity",0.3);			
				d3.select("body").append("svg")
					.attr("id","Bar_svg_cover_assist")
					.style("position","absolute")
					.style("left",0+"px")
					.style("top",0+"px")
					.style("width",1000+"px")
					.style("height",1000+"px")

					.on("mousemove",function(){
						if (d3.event.x<width-padding.left+left)
						{
							d3.select("#Bar_svg_cover").style("width",d3.event.x-mousex+"px");
							d3.select("#Bar_svg_cover_axis_x").style("width",d3.event.x-mousex+"px");						
						
						}

					})
					.on("mouseup",function(){
						if (d3.event.x<=width-padding.left+left){
						d3.select("#Bar_svg_cover").style("width",Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand()+"px");
						d3.select("#Bar_svg_cover_axis_x").style("width",Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand()+"px");
						
						var Drag_x_value_End=Math.round((d3.event.x-mousex)/(xScale.rangeBand()))+Drag_x_value;
						if (Drag_x_value<=(Drag_x_value_End-1)){
						console.log(xname+":["+Drag_x_value+","+(Drag_x_value_End-1)+"]");
						Bar_Svg_Cover_Remove(Math.max(padding.left+left,mousex)+Math.round((d3.event.x-mousex)/(xScale.rangeBand()))*xScale.rangeBand(),height-padding.bottom+top);}
						}
						
						else{
						d3.select("#Bar_svg_cover").style("width",width-padding.left-mousex+left+"px");
						d3.select("#Bar_svg_cover_axis_x").style("width",width-padding.left-mousex+left+"px");
						
						var Drag_x_value_End=Math.round((width-padding.left-mousex+left)/(xScale.rangeBand()))+Drag_x_value;
						if (Drag_x_value<=(Drag_x_value_End-1)){
						console.log(xname+":["+Drag_x_value+","+(Drag_x_value_End-1)+"]");
						Bar_Svg_Cover_Remove(width-padding.left+left,top-padding.bottom+height);}
					}

						d3.select(this).remove()
				});
				}
				else if(MouseX<=left+padding.left)
				{
				d3.select("#Bar_svg_cover_y").remove();
				d3.select("#Bar_svg_cover_y_axis").remove();
				d3.select(".linechart_div").append("svg")
					.attr("id","Bar_svg_cover_y")
					.style("position","absolute")
					.style("background","#FFC0CB")
					.style("top",Math.max(padding.top+top,mousey)+"px")
					.style("left",padding.left+left+"px")
					.style("width",width-padding.left-padding.right+"px")
					.style("height",0 +"px")
					.style("opacity",0.3);
				d3.select(".linechart_div").append("svg")
					.attr("id","Bar_svg_cover_y_axis")
					.style("position","absolute")
					.style("background","#FF7F50")
					.style("top",Math.max(padding.top+top,mousey)+"px")
					.style("left",left+10+"px")
					.style("width",padding.left-10+"px")
					.style("height",0 +"px")
					.style("opacity",0.3);
//-webkit-user-select:none;
//cursor:default;
				d3.select("body").append("svg")
					.attr("id","Bar_svg_cover_assist_y")
					.style("position","absolute")
					.style("left",0+"px")
					.style("top",0+"px")
					.style("width",1000+"px")
					.style("height",1000+"px")
					.on("mousemove",function(){
						if (d3.event.y<top+height-padding.bottom)
						{
							d3.select("#Bar_svg_cover_y").style("height",d3.event.y-mousey+"px");
							d3.select("#Bar_svg_cover_y_axis").style("height",d3.event.y-mousey+"px");
						}

					})
					.on("mouseup",function(){
						if (d3.event.y<=top+height-padding.bottom-padding.top){
						d3.select("#Bar_svg_cover_y")
							.style("height",Math.round((d3.event.y-mousey)/Bar_pery)*Bar_pery+"px");
						d3.select("#Bar_svg_cover_y_axis")
							.style("height",Math.round((d3.event.y-mousey)/Bar_pery)*Bar_pery+"px");
						var Drag_y_value_End=Drag_y_value-Math.round((d3.event.y-mousey)/Bar_pery);
						if (Drag_y_value>Drag_y_value_End){
							console.log(yname+":["+Drag_y_value_End+","+Drag_y_value+"]");
						}
						}
						else{
						d3.select("#Bar_svg_cover_y").attr("height",top+height-padding.bottom-mousey)
							.style("height",top+height-padding.bottom-mousey+"px");
						d3.select("#Bar_svg_cover_y_axis").attr("height",top+height-padding.bottom-mousey)
							.style("height",top+height-padding.bottom-mousey+"px");
						var Drag_y_value_End=Drag_y_value-Math.round((top+height-padding.bottom-mousey)/Bar_pery);
						if (Drag_y_value>Drag_y_value_End){
							console.log(yname+":["+Drag_y_value_End+","+Drag_y_value+"]");
						}
						}

						d3.select(this).remove()
					});
				}
			});

function Bar_Svg_Cover_Remove(left,top){
	var circle=d3.select(".linechart_div").append("svg")
		.attr("id","Bar_Svg_Cover_Remove")
		.style("position","absolute")
		.style("left",left+"px")
		.style("top",top+"px")
		.style("width",12+"px")
		.style("height",12+"px")
		.on("mousedown",function(){
				d3.select("#Bar_svg_cover_y").remove();
				d3.select("#Bar_svg_cover").remove();
				d3.select("#Bar_svg_cover_axis_x").remove();
				d3.select("#Bar_svg_cover_y_axis").remove();
				d3.select("#Bar_Svg_Cover_Remove").remove();
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

	//添加矩形元素
	var rects = svg.selectAll(".MyRect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("class","MyRect")
		.style("opacity",0.8)
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.attr("x", function(d,i){
			return xScale(i) + rectPadding/2;
		} )
		.attr("width", xScale.rangeBand() - rectPadding )
		.attr("y",function(d){
			var min = yScale.domain()[0];
			return yScale(min);
		})
		.attr("height", function(d){
			return 0;
		})
		.transition()
		.delay(function(d,i){
			return i * 200;
		})
		.duration(1800)
		.ease("bounce")
		.attr("y",function(d){
			return yScale(d);
		})
		.attr("height", function(d){
			return height - padding.top - padding.bottom - yScale(d);
		});

	//添加文字元素
	var texts = svg.selectAll(".MyText")
		.data(dataset)
		.enter()
		.append("text")
		.style("-webkit-user-select","none")
		.attr("class","MyText")
		.attr("transform","translate(" + padding.left + "," + padding.top*2/3 + ")")
		.attr("x", function(d,i){
			return xScale(i) + rectPadding/2;
		} )
		.attr("dx",function(){
			return (xScale.rangeBand() - rectPadding)/2;
		})
		.attr("dy",function(d){
			return 20;
		})
		.text(function(d){
			return d;
		})
		.attr("y",function(d){
			var min = yScale.domain()[0];
			return yScale(min);
		})
		.transition()
		.delay(function(d,i){
			return i * 200;
		})
		.duration(1800)
		.ease("bounce")
		.attr("y",function(d){
			return yScale(d);
		});

	//添加x轴
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) + ")")
		.call(xAxis)
		.append("text")
		.attr("class", "label")
		.attr("x", width-padding.left-padding.right/2)
		.attr("y", 25)
		.style("text-anchor", "end")
		.style("-webkit-user-select","none")

		.text(xname); 
		
	//添加y轴
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + padding.top + ")")
		.call(yAxis)
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
}