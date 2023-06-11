export default [
    {
        id: 1,
        name: 'kevin',
        note: 36,
        frames: 10,
        precode: `p.fill(255, 0, 0); `,
        animation: [
            ` p.circle(100,100,2); `,
            ` p.circle(100,100,10); `,
            ` p.circle(100,100,20); `,
            ` p.circle(100,100,30); `,
            ` p.circle(100,100,50); `,
            ` p.circle(100,100,70); `,
            ` p.circle(100,100,100); `,
        ],

        postcode: `          
                    
            `
    },
    {
        id: 2,
        name: 'bill',
        note: 37,
        frames: 20,
        precode: `p.fill('black');
            p.strokeWeight(3);
            p.stroke("yellow");  `,
        animation: [
            ` p.square(30,20, 200)`,
            `p.square(50,30, 200)`,
            `p.square(70,40, 200)`,
            ` p.square(100,50, 200)`,
            `p.square(130,60, 200)`,
        ],
        postcode: `              
  
            `
    },
    {
        id: 2,
        name: 'sam',
        note: 38,
        frames: 2,
        precode: `          
            p.fill(0, 0, 255);          
            p.circle(150,250,100);          
            `
    },
    {
        id: 3,
        name: 'bear',
        note: 39,
        cc: 77,
        frames: 2,
        precode: `          
            p.fill("black");
            p.stroke("white");
            p.strokeWeight(this.incomingCC / 5 + 2);          
            p.circle(p.width/2,p.height/2, this.incomingVelocity * 4 + 20);          
            `
    },
]
