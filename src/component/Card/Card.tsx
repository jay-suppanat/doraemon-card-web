import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cardArray: string[] = [
    "2", "22", "222", "2222",
    "3", "33", "333", "3333",
    "4", "44", "444", "4444",
    "5", "55", "555", "5555",
    "6", "66", "666", "6666",
    "7", "77", "777", "7777",
    "8", "88", "888", "8888",
    "9", "99", "999", "9999",
    "0", "00", "000", "0000",
    "j", "jj", "jjj", "jjjj",
    "q", "qq", "qqq", "qqqq",
    "k", "kk", "kkk", "kkkk",
    "a", "aa", "aaa", "aaaa"
]

const mapCardText: Record<string, string> = {
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "0": "10",
    "j": "J",
    "q": "Q",
    "k": "K",
    "a": "A"
}

const mapCommand: Record<string, string> = {
    "2": "สอง",
    "3": "สาม",
    "4": "สี่",
    "5": "ห้า",
    "6": "หก",
    "7": "เจ็ด",
    "8": "แปด",
    "9": "เก้า",
    "0": "สิบ",
    "j": "แจ๊ค",
    "q": "ควีน",
    "k": "คิง",
    "a": "เอด"
}

const cardSuit: Record<number, string> = {
    1: "♣️",
    2: "♦️",
    3: "♥️",
    4: "♠️"
}

const GameState = {
    PLAYING: "PLAYING",
    END: "END"
}

const CardFlipState = {
    FRONT: "FRONT",
    BACK: "BACK"
}

const Card = () => {
    const [gameState, setGameState] = useState(GameState.END)
    const [cardFlipState, setCardFlipState] = useState(CardFlipState.BACK)
    const [showingCardNumber, setShowingCardNumber] = useState("")
    const [cardCommand, setCardCommand] = useState("")

    function touchCardButton() {
        if (gameState == GameState.END) {
            setGameState(GameState.PLAYING)
            randomCard()
        } else if (gameState == GameState.PLAYING) {
            randomCard()
        }
    }

    function randomCard() {
        const randomCard: string = cardArray[Math.floor(Math.random() * cardArray.length)]
        processMapCard(randomCard)
        processMapCommand(randomCard)
        setCardFlipState(cardFlipState === CardFlipState.BACK ? CardFlipState.FRONT : CardFlipState.BACK)
    }

    function processMapCard(card: string) {
        if (!card) { return }
        const cardNumber = mapCardText[card.charAt(0).toLowerCase()]
        const suit = cardSuit[card.length]
        setShowingCardNumber(cardNumber + suit)
    }

    function processMapCommand(card: string) {
        if (!card) { return } 
        const cardCommand = mapCommand[card.charAt(0).toLowerCase()]
        setCardCommand(cardCommand)
    }

    // ปรับแก้ตรงส่วน return ของฟังก์ชัน Card
return (
    // เพิ่ม min-h-screen เพื่อให้กินพื้นที่เต็มจอแต่ขยายได้ และใช้ py-10 เพื่อเพิ่มพื้นที่บนล่าง
    <div className='flex flex-col gap-8 justify-start items-center min-h-screen w-full bg-black py-10 px-3.5 overflow-y-auto'>
        <h1 className='font-mono text-3xl font-bold text-white'>
            Doraemon Card
        </h1>

        <button onClick={touchCardButton} className="outline-none focus:outline-none active:scale-95 transition-transform">
            <AnimatePresence mode="wait">
                <motion.div
                    key={showingCardNumber}
                    initial={{ rotateY: -90, scale: 0.8, opacity: 0 }}
                    animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                    exit={{ rotateY: 90, scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    // ปรับขนาดให้เป็น responsive มากขึ้น โดยใช้ max-w
                    className="relative w-[300px] max-w-[85vw] mx-auto"
                >
                    <div className='bg-yellow-400 p-5 aspect-[1/1.5] rounded-[30px] shadow-xl overflow-hidden'>
                        <div className='bg-red-500 w-full h-full rounded-[20px] flex justify-center items-center shadow-inner'>
                            {gameState === GameState.PLAYING ? (
                                <p className="text-white text-6xl font-black font-mono drop-shadow-lg">
                                    {showingCardNumber}
                                </p>
                            ) : (
                                <p className="text-white text-xl font-bold animate-pulse text-center p-4">
                                    Touch to Start Game
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </button>

        {/* ย้ายข้อความคำสั่งออกมาข้างนอกปุ่ม เพื่อไม่ให้ไปรบกวนพื้นที่ Click ของการสับไพ่ */}
        <div className="min-h-[60px] flex items-center justify-center">
             <p className="font-mono text-[24px] font-normal text-white">
                {cardCommand}
            </p>
        </div>
    </div>
)
}

export default Card
