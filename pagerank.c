/*

Google PageRank checksum algorithm

The Google PageRank functionality in Google Toolbar works by querying Google's server for information on the PageRank of a specific page.
This might seem easy enough to implement in your own program/website, but the problem is that the toolbar calculates a checksum on the
page URL before querying the server, and the server only responds if the checksum is correct. Fortunately the checksum algorithm was
reverse engineered from Google Toolbar 7. I was provided the hand decompiled version of the algorithm in C from a friend. Then I went

ahead and rewrote it in PHP for web development usage. You can find both versions below.

As an example, the query URL for the page 'http://en.wikipedia.org/wiki/Cypherpunk' is :
http://toolbarqueries.google.com/tbr?client=navclient-auto&features=Rank&q=info:http://en.wikipedia.org/wiki/Cypherpunk&ch=783735859783

Any other query with a checksum other than 783735859783 will result in a '403 forbidden' response.

*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
 
char fch(uint csm)
{
    int a, b, c, t;
 
    a = csm % 10;
    t = 1;
    b = csm / 10;
    while(b) {
        c = b % 10;
        if(t)
            c = c / 5 + (c * 2) % 10;
        b /= 10;
        a += c;
        t ^= 1;
    }
 
    a = 10 - a % 10;
    if(a == 10)
        return '0';
     
    if(t)
        return '0' + (a & 1 ? a + 9 : a) / 2;
 
    return '0' + a;
}
 
uint checksum(char *str)
{
    int a, b, c, d, e;
    char *p;
 
    if(*str == '\0')
        return 0x1000;
 
    p = str;
    a = 5381;
    while(*p)
        a += (a << 5) + *p++;
     
    p = str;
    b = 0;
    while(*p)
        b = (b << 6) + (b << 16) - b + *p++;
 
    a = ((a >> 6) & 0x3ffffc0) | ((a >> 2) & 0x3f);
    c = ((a >> 4) & 0x3ffc00) | (a & 0x3ff);
    d = ((c >> 4) & 0x3c000) | (c & 0x3fff);
    c = (((d & 0x3c0) << 4) | (d & 0x3c)) << 2;
    a = b & 0x0f0f;
    e = b & 0x0f0f0000;
    b = ((d & 0xffffc000) << 4) | (d & 0x3c00);
 
    return (b << 10) | c | a | e;
}
 
#define PR_SERVER "http://toolbarqueries.google.com/tbr?client=navclient-auto&features=Rank&q=info:"
 
int main(int argc, char *argv[])
{
    uint csm;
 
    if(argc < 2) {
        fprintf(stderr, "usage: %s link\n",
            argv[0] ? argv[0] : "gchecksum");
        return EXIT_FAILURE;
    }
     
    csm = checksum(argv[1]);
    printf(PR_SERVER "%s&ch=7%c%u\n", argv[1], fch(csm), csm);
     
    return EXIT_SUCCESS;
}
