import CharacterCard from "./card/CharacterCard";
import LoadMore from "./load-button/load-more";
import type { JSX } from "react";
import { cardData } from "./card/cardData"
import Logo from '../assets/Rick-and-Morty-logo.svg'

export default function Characters(): JSX.Element {
    return (
        <>
            <div className="wrapper">
                <img className="main-logo" src={Logo} alt="main-logo" />
            </div>
            <div className="form-list">
                <form className="form wrapper" action="">
                    <a className="search-logo" href="#" />
                    <input className="form-input" type="text" placeholder="Filter by name..." />
                    <select className="form-select" name="Species" id="">
                        <option value="Species">Species</option>
                    </select>
                    <select className="form-select" name="Species" id="">
                        <option value="Gender">Gender</option>
                    </select>
                    <select className="form-select" name="Species" id="">
                        <option value="Status">Status</option>
                    </select>
                </form>
                <ul className="character-list wrapper">
                    {cardData.map(card => (
                        <CharacterCard
                            key={card.id}
                            id={card.id}
                            name={card.name}
                            img={card.img}
                            species={card.species}
                        />
                    ))}
                </ul>
                <LoadMore />
            </div>
        </>
    )
}