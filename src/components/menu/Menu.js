import { Link } from "react-router-dom";

import './styles.css'

export function Menu() {
    return (
        <div
            className="menu">
            <div>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>Home</h1>
                </Link>
            </div>
            <div>
                <Link to="/json" style={{ textDecoration: 'none' }}>
                    <h1>JSON</h1>
                </Link>
            </div>
        </div>
    )
}