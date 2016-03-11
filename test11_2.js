function data_taxi_speed(Num)
{
	var taxi_speed=[];
	for (i=0;i<Num.length;i++)
	{
		taxi_speed.push({
			Num.textInfo[i].speed
		});
	}
	return taxi_speed;
}