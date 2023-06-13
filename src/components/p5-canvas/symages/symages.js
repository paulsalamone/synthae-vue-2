export default [
    {
        id: 1,
        name: 'kevin',
        note: 36,
        // don't need frames, just calculate length of animations?
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
        frames: 20,
        animation: [
            "p.fill('rgba(100, 200, 30, 0.1)')",
            "p.fill('rgba(100, 200, 30, 0.2)')",
            "p.fill('rgba(100, 200, 30, 0.3)')",
            "p.fill('rgba(100, 200, 30, 0.4)')",
            "p.fill('rgba(100, 200, 30, 0.5)')",
            "p.fill('rgba(100, 200, 30, 0.6)')",
            "p.fill('rgba(100, 200, 30, 0.7)')",
            "p.fill('rgba(100, 200, 30, 0.8)')",
            "p.fill('rgba(100, 200, 30, 0.9)')",
            "p.fill('rgba(100, 200, 30, 1)')", "p.fill('rgba(100, 200, 30, 0.9)')", "p.fill('rgba(100, 200, 30, 0.8)')", "p.fill('rgba(100, 200, 30, 0.7)')",
            "p.fill('rgba(100, 200, 30, 0.6)')",
            "p.fill('rgba(100, 200, 30, 0.5)')",
            "p.fill('rgba(100, 200, 30, 0.4)')",
            "p.fill('rgba(100, 200, 30, 0.3)')",
            "p.fill('rgba(100, 200, 30, 0.2)')",
            "p.fill('rgba(100, 200, 30, 0.1)')",

        ],
        postcode: `p.circle(200,200,200);`


    },
    {
        id: 3,
        name: 'bear',
        note: 39,
        cc: 77,
        frames: 2,
        xx: true,
        xxColor: 'red',
        postcode: `
        p.circle(200,200,200);`

    },
]
