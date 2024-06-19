import React, { useState } from 'react'

const Hooks = () => {
    const [visible,setVisiblee] = useState(false);
    const [im,setIm] = useState("");
    const images = [ 
        "https://d24wwowrggd996.cloudfront.net/instafeeds/107322993_276946440189360_4369263675317915341_n.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/120998561_1059058984551855_7778707508575829741_n.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/125885806_394329631829024_661868587069961564_n.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/2.PNG",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/274159261_633298601065231_4330032820998596422_n.jpeg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/280764028_126842513303445_7609551248234395029_n.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/350236027_3542308642710232_1885434116938977359_n.jpeg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/53495555_126082778508237_1821645887213137707_n.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/69457240_604968550033246_5598253437247876366_n.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/73142797_164108538037425_4106714658881311611_n.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/80658986_113251243327476_6151562188425814814_n.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/Capture.PNG",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/IMG-20240604-WA0004.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/IMG-20240604-WA0005.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/IMG-20240604-WA0006.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/IMG-20240604-WA0007.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/IMG-20240604-WA0008.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/IMG-20240604-WA0015.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/IMG-20240604-WA0016.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/IMG-20240604-WA0017.jpg",
        "https://d24wwowrggd996.cloudfront.net/instafeeds/IMG-20240604-WA0018.jpg"
    ];

    const handleImage = (im)=>
        {
            setIm(im);
            console.log(im);
        }
  return (
    <div>Hooks
        <button onClick={()=>setVisiblee(false)}>Reset</button>
        <input type="file" name="" id="" onChange={()=>setVisiblee(!visible)}/>

        {visible &&
        images.map((im)=>
        (
            <img src={im} alt="not found" onClick={()=>handleImage(im)}/>
        ))}
        
    </div>
  )
}

export default Hooks