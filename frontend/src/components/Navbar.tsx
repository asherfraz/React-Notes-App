import { useAuth } from "@/hook/useAuth";
import { Github, LogIn, LogOut, X, Menu } from "lucide-react";
import { Link, useNavigate, NavLink } from "react-router";
import { logout } from "../api/userApis";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { useState } from "react";

const Navbar = () => {
	const user = useAuth();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleLogout = async () => {
		try {
			if (!user || !user._id) {
				toast.error("You are not logged in.");
				return;
			}

			const response = await logout(user._id);
			console.log("Logout response:", response);
			if (response.auth === false) {
				// dispatch removeUser from redux store
				dispatch(logoutUser());
				toast.success("Logout successful!");
				navigate("/login");
			} else {
				toast.error(response.message || "Logout failed. Please try again.");
				console.error("Logout failed:", response);
			}
		} catch (error) {
			console.error("Logout error:", error);
			toast.error("Logout failed. Please try again.");
		}
	};

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	const navLinkClass = ({ isActive }: { isActive: boolean }) =>
		isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white";

	return (
		<header className=" bg-blue-600 text-white shadow-md">
			<div className="container mx-auto px-4 py-3 flex justify-between items-center">
				{/* Logo */}
				<Link to="/" className="text-2xl font-bold">
					Notes App
				</Link>

				{/* Desktop Nav */}
				<nav className="hidden md:flex items-center gap-6">
					<NavLink to="/" className={navLinkClass}>
						Home
					</NavLink>
					<NavLink to="/add-note" className={navLinkClass}>
						Add Note
					</NavLink>
					{user && (
						<NavLink to="/profile" className={navLinkClass}>
							Profile
						</NavLink>
					)}
				</nav>

				{/* Auth Buttons */}
				<div className="hidden md:flex items-center gap-4">
					{user ? (
						<button
							onClick={handleLogout}
							className="flex items-center gap-2 border-2 border-white px-3 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
						>
							<span className="text-sm font-semibold">
								{user.fname}, Logout
							</span>
							<LogOut size={18} />
						</button>
					) : (
						<button
							onClick={() => navigate("/login")}
							className="flex items-center gap-2 border-2 border-white px-3 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
						>
							<span className="text-sm font-semibold">Login</span>
							<LogIn size={18} />
						</button>
					)}
					<Link
						to="https://github.com/asherfraz/"
						target="_blank"
						className="flex items-center gap-2 border-2 border-white px-3 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
					>
						<h2 className="text-sm font-bold">Checkout my Github</h2>
						<Github className="size-5 hover:text-gray-800" />
					</Link>
				</div>

				{/* Mobile Menu Toggle */}
				<button
					onClick={toggleMenu}
					className="md:hidden text-white focus:outline-none"
				>
					{menuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* Mobile Nav */}
			{menuOpen && (
				<div className="md:hidden bg-blue-500 px-4 pb-4">
					<nav className="flex flex-col gap-4">
						<NavLink to="/" className={navLinkClass} onClick={toggleMenu}>
							Home
						</NavLink>
						<NavLink
							to="/add-note"
							className={navLinkClass}
							onClick={toggleMenu}
						>
							Add Note
						</NavLink>
						<Link
							to="https://github.com/asherfraz/"
							target="_blank"
							className="text-white text-2xl font-bold flex justify-center items-center gap-2 border-2 rounded-lg p-2 hover:bg-white hover:text-primary transition-colors"
						>
							<h2 className="text-sm font-bold">Checkout my Github</h2>
							<Github className="size-5 hover:text-gray-800" />
						</Link>

						{user ? (
							<button
								onClick={() => {
									handleLogout();
									toggleMenu();
								}}
								className="flex items-center gap-2 border-2 border-white px-3 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
							>
								<span className="text-sm font-semibold">
									{user.fname}, Logout
								</span>
								<LogOut size={18} />
							</button>
						) : (
							<button
								onClick={() => {
									navigate("/login");
									toggleMenu();
								}}
								className="flex items-center gap-2 border-2 border-white px-3 py-1 rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
							>
								<span className="text-sm font-semibold">Login</span>
								<LogIn size={18} />
							</button>
						)}
					</nav>
				</div>
			)}
		</header>
	);
};

export default Navbar;
