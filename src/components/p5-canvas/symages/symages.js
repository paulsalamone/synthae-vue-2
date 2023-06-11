export default [
    {
        id: 1,
        name: 'kevin',
        note: 36,
        frames: 10,
        animation: [
            { size: 200 },
            { size: 100 },
            { size: 50 },
            { size: 10 },
        ],
        code: `          
            p.fill(255, 0, 0);          
            p.textSize(20);                   
            p.circle(100,100,100);          
            `,
        print: () => {
            console.log("hallo")
        }

    },
    {
        id: 2,
        name: 'bill',
        note: 37,
        frames: 20,
        code: `          
            p.fill(0, 255, 0);          
            p.circle(200,200,100);          
            `,
        print: () => {
            alert("hallo")
        }
    },
    {
        id: 2,
        name: 'sam',
        note: 38,
        frames: 2,
        code: `          
            p.fill(0, 0, 255);          
            p.circle(150,250,100);          
            `,
        print: () => {
            alert("hallo")
        }
    }
]
