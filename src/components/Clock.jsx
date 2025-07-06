import { useState ,useEffect} from "react";

const Clock = () => {

    const [time,setTime] = useState(new Date());

    useEffect ( () => {
        const intervalID = setInterval(() => {
            setTime(new Date());
        },1000)
        return ()=>
        clearInterval(intervalID)
    })

    const formatTime = () => {
        let hrs = time.getHours();
        const min = time.getMinutes();
        const unit = hrs >= 12 ? "PM" : "AM";

        hrs = hrs % 12 || 12
        return `${hrs}:${padZero(min)} ${unit} `
    }
    function padZero(number){
        return (number < 10 ? "0" : "") + number;

    }

    return (
        <>
            <div className="clock-bg">
                <div className="clock">
                    <p>{formatTime()}</p>
                </div>
            </div>
        </>
    );

}
export default Clock;