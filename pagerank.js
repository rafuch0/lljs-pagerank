function checksum(str)
{
	var checkum;
	var functioncheck;

	var a, b, c, d, e, p;

	if(str === '')
	{
		checksum = 0x1000;
	}
	else
	{
		a = 5381;

		for(var i = 0; i < str.length; i++)
		{
			a = (a + (a << 5) + parseInt(str[i], 10));
		}

		b = 0;

		for(var i = 0; i < str.length; i++)
		{
console.log((b << 6));
			b = ((b << 6) + (b << 16) - b + parseInt(str[i], 10));
		}

		a = ((a >> 6) & 0x3ffffc0) | ((a >> 2) & 0x3f);
		c = ((a >> 4) & 0x3ffc00) | (a & 0x3ff);
		d = ((c >> 4) & 0x3c000) | (c & 0x3fff);
		c = ((((d & 0x3c0) << 4) | (d & 0x3c)) << 2);
		a = b & 0x0f0f;
		e = b & 0x0f0f0000;
		b = ((d & 0xffffc000) << 4) | (d & 0x3c00);

		checksum = (b << 10) | c | a | e;

/*                                                                         */

		var t;

		a = checksum % 10;
		t = 1;
		b = Math.floor(checksum / 10);
		while(b)
		{
			c = b % 10;
			if(t === 1)
			{
				c = Math.floor(c / 5) + (c * 2) % 10;
			}
			b = Math.floor( b / 10);
			a += c;
			t ^= 1;
		}

		a = 10 - a % 10;

		if(a === 10)
		{
			functioncheck = 48;
		}
		else if(t !== 0)
		{
			functioncheck = 48 + Math.floor((a & 1 ? a + 9 : a) / 2);
		}
		else
		{
			functioncheck = 48 + a;
		}
	}

console.log(checksum+"\n");
console.log(functioncheck);
}

checksum('derp');
