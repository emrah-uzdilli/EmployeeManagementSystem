import React from 'react';
import { FaHome, FaUsers, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { Navbar, Nav, Button } from 'react-bootstrap';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <Button variant="dark" className="sidebar-toggle" onClick={toggleSidebar}>
                <FaBars />
            </Button>
            <Nav className="flex-column">
                <Nav.Link href="#home">
                    <FaHome /> Anasayfa
                </Nav.Link>
                <Nav.Link href="#employee-list">
                    <FaUsers /> Employee List
                </Nav.Link>
                <Nav.Link href="#logout">
                    <FaSignOutAlt /> LogOut
                </Nav.Link>
            </Nav>
        </div>
    );
};

export default Sidebar;
