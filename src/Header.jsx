import spyImage from './assets/spy.png';
function Header() {
    return (
        <header>
            <img className="spy" src={spyImage} alt="Spy Image" />
            <div><h1>UNDERCOVER</h1>
            <h2>~online game~</h2></div>
            <img className="spy" src={spyImage} alt="Spy Image" />
        </header>
    );
}

export default Header;
