import React from 'react';

const Translations = () => {
    const data =
        [
            {
                "_id": "673abce901",
                "text": "Welcome to our application",
                "translations": [
                    { "languageCode": "en", "translatedText": "Welcome to our application" },
                    { "languageCode": "hi", "translatedText": "हमारे एप्लिकेशन में आपका स्वागत है" },
                    { "languageCode": "te", "translatedText": "మా అప్లికేషన్‌ కు స్వాగతం" },
                    { "languageCode": "ta", "translatedText": "எங்கள் செயலிக்கு வரவேற்கிறோம்" }
                ],
                "createdAt": "2025-12-03T10:22:00Z"
            },
            {
                "_id": "673abce902",
                "text": "Login",
                "translations": [
                    { "languageCode": "en", "translatedText": "Login" },
                    { "languageCode": "hi", "translatedText": "लॉग इन" },
                    { "languageCode": "te", "translatedText": "లాగిన్" },
                    { "languageCode": "ta", "translatedText": "உள்நுழைக" }
                ],
                "createdAt": "2025-12-03T10:23:00Z"
            },
            {
                "_id": "673abce903",
                "text": "Logout",
                "translations": [
                    { "languageCode": "en", "translatedText": "Logout" },
                    { "languageCode": "hi", "translatedText": "लॉग आउट" },
                    { "languageCode": "te", "translatedText": "లాగౌట్" },
                    { "languageCode": "ta", "translatedText": "வெளியேறு" }
                ],
                "createdAt": "2025-12-03T10:24:00Z"
            },
            {
                "_id": "673abce904",
                "text": "Search",
                "translations": [
                    { "languageCode": "en", "translatedText": "Search" },
                    { "languageCode": "hi", "translatedText": "खोजें" },
                    { "languageCode": "te", "translatedText": "వెతకండి" },
                    { "languageCode": "ta", "translatedText": "தேடல்" }
                ],
                "createdAt": "2025-12-03T10:25:00Z"
            },
            {
                "_id": "673abce905",
                "text": "Submit",
                "translations": [
                    { "languageCode": "en", "translatedText": "Submit" },
                    { "languageCode": "hi", "translatedText": "जमा करें" },
                    { "languageCode": "te", "translatedText": "సమర్పించండి" },
                    { "languageCode": "ta", "translatedText": "சமர்ப்பிக்கவும்" }
                ],
                "createdAt": "2025-12-03T10:26:00Z"
            }
        ]

    return (
        <div className=" w-full ">
            <div className='w-full p-3 flex justify-center mb-6'>
                <input type="search" name="" id="" placeholder='Search Key' className='w-3/4 items-center text-black p-3 border-2 rounded-2xl shadow-lg' />
            </div>

            <div>
                {
                    data.map((item) => {
                        return (
                            <div className="overflow-x-auto bg-background p-4 rounded-2xl mb-4 shadow-lg" key={item._id}>
                                <div className=" collapse border">
                                    <input type="checkbox" className="peer" />
                                    <div
                                        className="collapse-title  peer-checked: peer-checked:text-secondary-content text-2xl font-bold"
                                    >
                                        {item.text}
                                    </div>


                                    <div className="overflow-x-auto">
                                        <table className="table text-2xl text-black w-full font-semibold">
                                            {/* head */}
                                            <thead className='font-semibold text-2xl text-white'>
                                                <tr>
                                                    <th></th>
                                                    <th>Language Code</th>

                                                    <th>Translation Text</th>
                                                    <th>
                                                        Actions
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.translations.map((translation, index) => (
                                                    <tr key={translation.languageCode ?? index} className="hover">
                                                        <th className="px-4 py-3">{index + 1}</th>
                                                        <td className="px-4 py-3">{translation.languageCode}</td>
                                                        <td className="px-4 py-3">{translation.translatedText}</td>
                                                        <td className="px-4 py-3 text-center">
                                                            <div className="inline-flex items-center justify-center gap-3">
                                                                <button className='text-black px-10 py-3 cursor-pointer border-b-2 active:bg-white duration-200 rounded-xl'>Edit</button>
                                                                <button className='text-black px-10 py-3 cursor-pointer border-b-2 active:bg-white duration-200 rounded-xl'>Delete</button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Translations;
