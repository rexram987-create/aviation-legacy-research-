if (window.AIRLINE_DATA) {
  const fleetDetails = {
    "emirates": "Emirates מזוהה עם צי רחב־גוף כמעט מובהק, המתאים לטיסות ארוכות ולתנועה בין יבשות. סוגי המטוסים המרכזיים שלה כוללים Airbus A380-800, Boeing 777-300ER, Boeing 777-200LR ו-Airbus A350-900. ה-A380 מתאים לקווים עתירי ביקוש וצפיפות נוסעים, ה-777 משמש עמוד שדרה ארוך־טווח וגמיש, וה-A350 מייצג דור חדש יותר של יעילות, טווח וחוויית נוסע. מבחינה מחקרית, הצי של Emirates אינו רק אוסף דגמים, אלא הצהרה אסטרטגית: להעביר הרבה נוסעים למרחקים גדולים דרך מרכז אחד חזק בדובאי.",

    "american-airlines": "צי המטוסים של American Airlines משלב מטוסים צרי־גוף לקווים פנים־אמריקאיים וקצרים־בינוניים, ומטוסים רחבי־גוף לטיסות בין־יבשתיות. סוגי המטוסים המרכזיים כוללים ממשפחת Airbus A320: Airbus A319, Airbus A320, Airbus A321 ו-Airbus A321neo; ממשפחת Boeing 737: Boeing 737-800 ו-Boeing 737 MAX 8; ובקווים ארוכי טווח: Boeing 777-200ER, Boeing 777-300ER, Boeing 787-8 ו-Boeing 787-9. מבחינה תפעולית, מטוסי A320 ו-737 מזינים את נמלי הבסיס, בעוד 777 ו-787 מחברים את הרשת האמריקאית לאירופה, אסיה ואמריקה הלטינית.",

    "delta-air-lines": "Delta מפעילה צי מגוון במיוחד. בקווים קצרים ובינוניים מופיעים בין היתר Airbus A220-100, Airbus A220-300, Airbus A319, Airbus A320, Airbus A321 ו-Airbus A321neo, לצד Boeing 717 ו-Boeing 737-800 / 737-900ER. בקווים ארוכים יותר החברה מפעילה מטוסים רחבי־גוף כמו Airbus A330-200, Airbus A330-300, Airbus A330-900neo ו-Airbus A350-900, וכן Boeing 767-300ER, Boeing 767-400ER ו-Boeing 757-200/300 בחלק מהקווים הבינוניים־ארוכים. מבחינה מחקרית, זהו צי שממחיש מעבר מחברה אזורית־חקלאית לרשת עולמית מורכבת.",

    "united-airlines": "United מפעילה צי רחב ומגוון. בצד הצר־גוף מופיעים Airbus A319, Airbus A320, Airbus A321neo, Boeing 737-700, 737-800, 737-900, 737-900ER, 737 MAX 8 ו-737 MAX 9. בצד הרחב־גוף והבין־יבשתי מופיעים Boeing 757-200, Boeing 767-300ER, Boeing 767-400ER, Boeing 777-200, Boeing 777-300ER, Boeing 787-8, Boeing 787-9 ו-Boeing 787-10. לחברה גם הזמנות או תוכניות עתידיות לדגמים כמו Airbus A321XLR ו-Airbus A350-900. מבחינה מחקרית, זהו צי שמותאם לרשת hubs עצומה: מטוסים קטנים ובינוניים להזנה פנימית, ומטוסים גדולים וארוכי־טווח לחיבור בין יבשות.",

    "air-france": "Air France מפעילה צי שמשלב מטוסים צרי־גוף לקווים קצרים ובינוניים באירופה ובאגן הים התיכון, ומטוסים רחבי־גוף לקווים בין־יבשתיים. סוגי המטוסים המרכזיים כוללים Airbus A220-300, Airbus A318, Airbus A319, Airbus A320, Airbus A321, Airbus A330-200, Airbus A350-900, Boeing 777-200ER, Boeing 777-300ER ו-Boeing 787-9. בנוסף, פעילות המטען כוללת Boeing 777F, ויש תכנון/הזמנות למטוסי מטען Airbus A350F. מבחינה מחקרית, הצי משקף את תפקידה הכפול של החברה: גם חברת חיבור אירופית וגם נושאת דגל גלובלית."
  };

  Object.entries(fleetDetails).forEach(([slug, body]) => {
    const airline = window.AIRLINE_DATA[slug];
    if (!airline) return;
    if (!Array.isArray(airline.sections)) airline.sections = [];

    const section = airline.sections.find(item => item.title === "צי מטוסים ותפיסה תפעולית");
    if (section) {
      section.body = body;
    } else {
      const summaryIndex = airline.sections.findIndex(item => item.title.includes("מסכמת"));
      const insertIndex = summaryIndex >= 0 ? summaryIndex : airline.sections.length;
      airline.sections.splice(insertIndex, 0, {
        title: "צי מטוסים ותפיסה תפעולית",
        body
      });
    }
  });
}
