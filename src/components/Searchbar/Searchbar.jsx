import { memo } from "react";
import useForm from '../share/hooks/useForm'
import ButtonIcon from '../share/Button/ButtonIcon';
import { ImSearch } from 'react-icons/im';

const initialState = { search: '' };

const Searchbar = ({ onSubmit }) => {
    const { state, handleChange, hendleSubmit } = useForm({ initialState, onSubmit });

    const { search } = state;

    return (
        <header className="Searchbar">
            <form className="SearchForm" onSubmit={hendleSubmit}>
                <ButtonIcon
                    type="submit"
                    className="SearchForm-button"
                >
                    <ImSearch />
                    <span className="SearchForm-button-label">Search</span>
                </ButtonIcon>
                <input
                    className="SearchForm-input"
                    name="search"
                    type="text"
                    value={search}
                    onChange={handleChange}
                    // autoComplete="off"
                    autoFocus
                    required
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
}

export default memo(Searchbar);