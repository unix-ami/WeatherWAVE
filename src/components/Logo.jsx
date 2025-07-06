import icon from '../assets/logo.png';
function Logo(){
    return(<>
    <div className="Logo-position">
    {/* <p className="Logo-name">Weather <br /> WAVE</p> */}
        <img className="Logo-img" src={icon} alt="" width="65px"/>
    </div>
    
    </>);
}
export default Logo;