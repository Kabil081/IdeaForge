import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Litracy = () => {
  return (
    <>
    <Navbar/>
    <div>
    <div className='h-[500px] bg-gradient-to-r from-cyan-500 to-blue-500 w-full flex justify-evenly items-center p-8'>
      <div className='flex flex-col justify-center'>
        <h1 className='font-bold text-black font-sans text-[40px]'>
          What is Financial Literacy? 
        </h1>
        <p className='text-[24px]'>
          Get to know about how things work and make life happier!
        </p>
        </div>
      </div>
    <div className='flex justify-center mt-8'>
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/zNTNWQmf1DE"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    <div className='p-8 mt-8'>
      <h2 className='text-[30px] font-semibold mb-4'>Gold Status in India</h2>
      <p className='text-[18px] mb-4'>
        Gold remains a significant investment option in India, with a strong cultural and economic value. 
        The demand for physical gold continues to be high, especially during festive seasons and weddings.
      </p>
      <p className='text-[18px] mb-4'>
        In recent times, the gold price has fluctuated based on international market conditions and local demand. 
        Buyers should stay updated on daily gold rates before making any purchases.
      </p>
      <button className='bg-blue-500 text-white py-2 px-4 rounded mt-4'>
        Learn More
      </button>
    </div>
    <div className='p-8 mt-8'>
      <h2 className='text-[30px] font-semibold mb-4'>Where to Buy Gold and E-Gold</h2>
      <p className='text-[18px] mb-4'>
        Physical gold can be bought from authorized jewelers across Tamil Nadu. Some popular locations include Chennai, Coimbatore, and Madurai. 
        Ensure you buy from reputable dealers to avoid issues with purity.
      </p>
      <p className='text-[18px] mb-4'>
        E-Gold, a digital form of investing in gold, can be purchased through online platforms such as Stock Holding Corporation of India (SHCIL), 
        and through various trading platforms that offer gold ETFs and Sovereign Gold Bonds (SGB).
      </p>
      <button className='bg-blue-500 text-white py-2 px-4 rounded mt-4'>
        Learn More
      </button>
    </div>
    <div>
    <div className='p-8 mt-8'>
      <h2 className='text-[30px] font-semibold mb-4'>Stocks in Tamil Nadu</h2>
      <p className='text-[18px] mb-4'>
        The stock market in Tamil Nadu is growing rapidly with many investors actively trading on exchanges like NSE and BSE. 
        People can invest in local companies or diversify into national and international stocks through various trading platforms.
      </p>
      <p className='text-[18px] mb-4'>
        Online platforms like Zerodha, Groww, and Upstox have made it easier for residents to trade stocks. It's advisable to stay informed 
        about stock market trends and regulations before making investments.
      </p>
      <button className='bg-blue-500 text-white py-2 px-4 rounded mt-4'>
        Learn More
      </button>
    </div>
    <div className='p-8 mt-8'>
      <h2 className='text-[30px] font-semibold mb-4'>Mutual Funds in Tamil Nadu</h2>
      <p className='text-[18px] mb-4'>
        Mutual funds are a popular investment choice for people in Tamil Nadu, offering a diversified portfolio managed by professionals. 
        Both equity and debt mutual funds are available based on investors risk appetite.
      </p>
      <p className='text-[18px] mb-4'>
        Platforms like Groww, Paytm Money, and Zerodha Coin allow easy investment in mutual funds, and SIP (Systematic Investment Plan) options 
        help in creating disciplined investment habits over time.
      </p>
      <button className='bg-blue-500 text-white py-2 px-4 rounded mt-4'>
        Learn More
      </button>
    </div>
    <div className='p-8 mt-8'>
      <h2 className='text-[30px] font-semibold mb-4'>Cryptocurrency in Tamil Nadu</h2>
      <p className='text-[18px] mb-4'>
        Cryptocurrency has gained momentum in Tamil Nadu, with many investors exploring digital assets like Bitcoin, Ethereum, and other altcoins. 
        Despite regulatory uncertainties, many exchanges like WazirX, CoinDCX, and Binance are popular among crypto enthusiasts.
      </p>
      <p className='text-[18px] mb-4'>
        Investors should be cautious about the volatility and risks involved in crypto investments. It’s recommended to research well and 
        consider only trusted platforms for transactions.
      </p>
      <button className='bg-blue-500 text-white py-2 px-4 rounded mt-4'>
        Learn More
      </button>
    </div>
    <div className='p-8 mt-8'>
      <h2 className='text-[30px] font-semibold mb-4'>Real Estate in Tamil Nadu</h2>
      <p className='text-[18px] mb-4'>
        Real estate remains one of the most favored investment options in Tamil Nadu, especially in cities like Chennai, Coimbatore, and Madurai. 
        Residential and commercial properties continue to appreciate, making real estate a secure long-term investment.
      </p>
      <p className='text-[18px] mb-4'>
        People can invest directly in properties or explore Real Estate Investment Trusts (REITs) for a more diversified approach. 
        Its essential to verify property documentation and legal status before any purchase.
      </p>
      <button className='bg-blue-500 text-white py-2 px-4 rounded mt-4'>
        Learn More
      </button>
    </div>
  </div>
  </div>
  <Footer/></>
    
  )
}

export default Litracy