import { Link } from "react-router";

const Footer = () => {
	return (
		<footer className="text-white bg-primary body-font">
			<div className="container px-5 py-6 mx-auto text-center">
				<p className="text-sm text-white/90">
					© {new Date().getFullYear()} Notes App — Built by{" "}
					<Link
						to="https://asherfraz.com/"
						className="text-white underline hover:text-white/80"
						target="_blank"
						rel="noopener noreferrer"
					>
						@asherfraz
					</Link>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
