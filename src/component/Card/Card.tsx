import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cardArrayConstants, kingCardArrayConstants } from "../../support file/constants.tsx"

let cardArray: string[] = [
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

let kingCardArray: string[] = ["k", "kk", "kkk", "kkkk"]

const mapCommand: Record<string, string> = {
    "2": "กินครึ่งแก้ว",
    "3": "คนทางซ้ายกิน",
    "4": "คนทางขวากิน",
    "5": "เลือกใครเป็นบัดดี้ก็ได้\nหรือ\nยกเลิกการเป็นบัดดี้",
    "6": "เลือกหมวดหมู่มา 1 หมวด\nใครตอบผิด ตอบซ้ำ\nตอบไม่ได้ กินหมดแก้ว",
    "7": "เลือกตัวเลขมา 1 ตัว\nห้ามพูดเลขที่มีเลขที่เลือก\nหรือหารด้วยตัวเลขที่เลือกลงตัว",
    "8": "เก็บการ์ดนี้ไว้\nเมื่อใช้จะสามารถไปเข้าห้องน้ำได้\nใช้ตอนไหนก็ได้",
    "9": "ทำท่าจับคางตอนไหนก็ได้\nแล้วให้คนอื่นทำตาม\nใครทำคนสุดท้าย กินหมดแก้ว",
    "0": "สร้างคำขึ้นมา 1 คำ ห้ามพูดคำนี้\nจนกว่าเกมจะจบ",
    "j": "เลือกใบ้ใครก็ได้ 1 คน\n(จะยกเลิกเมื่อมีคนคุยด้วย)",
    "q": "สั่งใครกินก็ได้",
    "k": "K ใบแรก: สั่งว่าให้ทำไร\nK ใบสอง: จำนวนเท่าไร\nK ใบสาม: ทำที่ไหน\nK ใบสี่: ให้ใครทำ",
    "a": "กินหมดแก้ว"
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
        if (kingCardArray.length === 0) {
            // kingCardArray = cardArrayConstants
            // cardArray = kingCardArrayConstants
            alert("Game End")
            return
        }

        const randomCard: string = cardArray[Math.floor(Math.random() * cardArray.length)]

        if (randomCard.includes("k")) {
            kingCardArray.shift()
        }

        cardArray.splice(cardArray.indexOf(randomCard), 1)

        console.log(randomCard)
        console.log(cardArray)
        console.log(kingCardArray)

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

        <button onClick={touchCardButton}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={showingCardNumber}
                    initial={{ rotateY: -90, scale: 0.8, opacity: 0 }}
                    animate={{ rotateY: 0, scale: 1, opacity: 1 }}
                    exit={{ rotateY: 90, scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative w-[300px] max-w-[85vw] mx-auto"
                >
                    <div className='flex bg-yellow-400 p-5 aspect-[1/1.5] rounded-[30px] shadow-xl overflow-hidden'>
                        <div className='flex-1 bg-red-500 rounded-[20px] flex justify-center items-center shadow-inner'>
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

        <div className="min-h-[60px] flex items-center justify-center">
             <p className="font-mono text-[24px] font-normal text-white">
                {cardCommand}
            </p>
        </div>
    </div>
)
}

export default Card
