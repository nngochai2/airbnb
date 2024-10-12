import React from 'react'

const FooterImportantLinks = [
	{
		title: "Hướng dẫn thanh toán & vận chuyển",
		link: "https://astravel.com.vn/huong-dan-thanh-toan-van-chuyen/",
	},
	{
		title: "Hướng dẫn mua hàng",
		link: "https://astravel.com.vn/huong-dan-mua-hang/",
	},
	{
		title: "Khiếu nại và hoàn trả",
		link: "https://astravel.com.vn/khieu-nai-va-hoan-tra/",
	},

];
const FooterContactLinks = [
	{
		title: "Facebook",
		link: "https://www.facebook.com/ascendgroup.com.vn",
	},
	{
		title: "Google",
		link: "https://www.google.com.vn/search?q=C%C3%B4ng+Ty+C%E1%BB%95+Ph%E1%BA%A7n+D%E1%BB%8Bch+V%E1%BB%A5+L%E1%BB%AF+H%C3%A0nh+Thu%E1%BA%ADn+An+-+Ascend+Travel&ludocid=921658034286662083",
	},
	{
		title: "YouTube",
		link: "https://www.youtube.com/channel/UCiT7YbHxsBl6ZdgwTn0ZlEQ",
	},
];

const Footer = () => {
	return (
		<div className='block h-50 bg-black'>
			<div className='grid gird-cols-2 sm:grid-cols-3 col-span-2 md:pl-10'>
				<div>
					<div className='py-8 px-4'>
						<div className='py-8 px-4'>
							<h1 className='sm:text-xl text-xl font-bold sm:text-left text-justify mb-3 text-white'>
								Hỗ trợ khách hàng
							</h1>
							<ul>
								{
									FooterImportantLinks.map((link) => (
										<li className='cursor-pointer hover:translate-x-1 duration-300 text-white' key={link.title}>
											<span>{link.title}</span>
										</li>
									))
								}
							</ul>
						</div>
					</div>
				</div>

			</div>
		</div>
	)
}

export default Footer
