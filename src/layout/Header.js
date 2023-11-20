import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaRegTimesCircle } from 'react-icons/fa';
import { RiCloseFill } from 'react-icons/ri';
import { useState } from 'react';

const Header = () => {
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchOption, setSearchOption] = useState('title');
    const navigate = useNavigate();

    let backPressedOnce = false;

    M.onBack(function (e) {
        if (window.location.pathname === '/') {
            if (backPressedOnce) {
                M.sys.exit();
            } else {
                M.pop.instance("앱을 종료하시려면 뒤로가기를 한 번 더 눌러주세요.");
                backPressedOnce = true;
                setTimeout(() => {
                    backPressedOnce = false;
                }, 3000);
            }
        } else {
            navigate(-1);
        }
    });

    const toggleSearch = () => {
        setSearchOpen(!isSearchOpen);
        navigate('/');
    };

    const handleSearch = () => {
        if (searchText) {
            navigate(`/custom?search=${searchText}&option=${searchOption}`);
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
                <Link to="/">
                    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Image" />
                    보조알리미
                </Link>
            </div>
            <div className="util">
                <div className="util-btn" onClick={toggleSearch}>
                    <FaSearch />
                </div>
            </div>
            {isSearchOpen && (
                <div className={`search-modal ${isSearchOpen ? 'open' : ''}`}>
                    <div className="search-content">
                        <button onClick={closeSearch} className="close-search" style={{ boxShadow: 'none', width: '25px' }}>
                            <RiCloseFill />
                        </button>
                        <h3 style={{ textAlign: 'center' }}>궁금한 정책을 검색해 보세요!</h3>
                        <div className="search-input">
                            <select
                                value={searchOption}
                                onChange={(e) => setSearchOption(e.target.value)}
                            >
                                <option value="title">제목</option>
                                <option value="description">내용</option>
                                <option value="category">카테고리</option>
                            </select>
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
                                    onClick={() => setSearchText('')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
