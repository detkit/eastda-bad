import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Listing() {
	SwiperCore.use([Navigation]);
	const [listing, setListing] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const params = useParams();

	useEffect(() => {
		const fetchListing = async () => {
			try {
				setLoading(true);
				const res = await fetch(`/api/listing/${params.listingId}`);
				const data = await res.json();

				if (data.success === false) {
					setError(true);
					setLoading(false);
					return;
				}
				setListing(data);
				setLoading(false);
				setError(false);
			} catch (error) {
				setError(true);
				setLoading(false);
			}
		};

		fetchListing();
	}, [params.listingId]);

	return (
		<main>
			{loading && <p className='text-2xl text-center my-7'>Loading...</p>}
			{error && (
				<p className='text-2xl text-center my-7'>
					Something went wrong!
				</p>
			)}
			{listing && !loading && !error && (
				<div>
					<Swiper navigation>
						{listing.imageUrls.map((url) => (
							<SwiperSlide key={url}>
								<div
									className='h-[550px]'
									style={{
										background: `url(${url}) center no-repeat`,
										backgroundSize: 'cover',
									}}
								></div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			)}
		</main>
	);
}