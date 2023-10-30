import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaRegTimesCircle } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';
import { useState } from 'react';

const Header = () => {
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    const toggleSearch = () => {
        setSearchOpen(!isSearchOpen);
    };

    const handleSearch = () => {
        if (searchText) {
            navigate(`/custom?search=${searchText}`);
            setSearchText('');
            setSearchOpen(false);
        }
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const closeSearch = () => {
        setSearchOpen(false);
        setSearchText('');
    };

    return (
        <header>
            <div className="title">
                <Link to="/">제목</Link>
            </div>
            <div className="util">
                <div className="util-btn" onClick={toggleSearch}>
                    <FaSearch />
                </div>
                <div className="util-btn">
                    <FaBell />
                </div>
            </div>
            {isSearchOpen && (
                <div
                    className={`search-modal ${isSearchOpen ? 'open' : ''}`}
                    // onClick={(e) => {
                    //     if (e.target.classList.contains('search-modal')) {
                    //         closeSearch();
                    //     }
                    // }}
                >
                    <div className="search-content">
                        <button onClick={closeSearch} className="close-search">
                            <RiCloseFill />
                        </button>

                        <h3>궁금한 정책을 검색해 보세요!</h3>

                        <div className="search-input">
                            <input
                                type="text"
                                placeholder="검색어를 입력하세요"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                onKeyPress={handleEnter}
                            />
                            <div>
                                <FaRegTimesCircle
                                    className="close-icon"
                                    onClick={() => {
                                        setSearchText('');
                                    }}
                                />
                                <FaSearch className="search-icon" onClick={handleSearch} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
