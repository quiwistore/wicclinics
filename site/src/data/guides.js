// WIC guides — income table verified against Federal Register 2026-08323 (effective Jul 1 2026 - Jun 30 2027)
export const guides = [
  {
    slug: 'wic-income-guidelines',
    title: 'WIC Income Guidelines 2026-2027: Official Limits by Household Size',
    short: 'Income limits 2026-2027',
    icon: 'fa-table-list',
    hook: 'The new table took effect July 1, 2026 — and a pregnancy counts as +1 household member.',
    quick: 'To qualify by income, your gross household income must be at or below 185% of the federal poverty guidelines. For July 1, 2026 through June 30, 2027: $29,526/year for a household of 1, $40,034 for 2, $50,542 for 3, $61,050 for 4 — add $10,508 for each additional member. A pregnant woman counts as at least 2 people. And if anyone in your household has Medicaid, SNAP or TANF, you are automatically income-eligible regardless of this table.',
    desc: 'Official WIC income limits for July 2026-June 2027 by household size (185% of federal poverty guidelines), how pregnancy changes your household count, and the Medicaid shortcut that skips the table entirely.',
    body: [
      ['p', 'Half the outdated pages online still show last year\'s numbers. These are the limits the USDA published in the Federal Register in April 2026, in force since July 1, 2026 — the ones your clinic is actually using today.'],
      ['h2', 'The official table (48 states, D.C. and territories)'],
      ['table', [
        ['Household size', 'Annual', 'Monthly', 'Weekly'],
        ['1', '$29,526', '$2,461', '$568'],
        ['2', '$40,034', '$3,337', '$770'],
        ['3', '$50,542', '$4,212', '$972'],
        ['4', '$61,050', '$5,088', '$1,175'],
        ['5', '$71,558', '$5,964', '$1,377'],
        ['6', '$82,066', '$6,839', '$1,579'],
        ['7', '$92,574', '$7,715', '$1,781'],
        ['8', '$103,082', '$8,591', '$1,983'],
        ['Each additional', '+$10,508', '+$876', '+$203']
      ]],
      ['p', 'Alaska and Hawaii use higher limits — check with your local clinic or the USDA notice. Income means <strong>gross</strong> (before taxes), and states may set limits between 100% and 185% of poverty, though most use the maximum shown here.'],
      ['h2', 'The two rules that change everything'],
      ['ul', ['<strong>Pregnancy adds to household size.</strong> A pregnant woman counts as at least 2 people (some states count each expected baby). A single pregnant woman uses the household-of-2 line: $40,034, not $29,526.', '<strong>Adjunctive eligibility:</strong> if you or certain household members receive <strong>Medicaid, SNAP or TANF</strong>, you automatically meet WIC income rules — the table above stops mattering. Since pregnancy Medicaid reaches 278% of poverty in some states, many families "over" the WIC line still qualify this way. See <a href="/wic-eligibility/">the eligibility guide</a>.']],
      ['h2', 'What counts as income — and what proof to bring'],
      ['ul', ['Wages before deductions, self-employment net income, unemployment, child support and alimony received, and most regular payments.', 'Proof: recent pay stubs, a benefits letter, or last year\'s tax return. No documents? Tell the clinic — a sworn statement is generally accepted as a last resort, and you usually get 30 days to bring proof after enrollment.', 'Your "household" is everyone you live with and share income and expenses with — related or not.']],
      ['h2', 'Slightly over the line? Read this before giving up'],
      ['ol', ['Recount the household: pregnancy (+1 or more), a new baby, or a relative who moved in all raise the limit by $10,508 each.', 'Check Medicaid: pregnancy Medicaid limits are far higher than WIC\'s in most states — qualifying there qualifies you for WIC automatically.', 'Income dropped recently? Clinics can assess current income rather than last year\'s — bring your most recent stubs.']]
    ],
    faq: [
      ['Is WIC income counted before or after taxes?', 'Before taxes (gross income). That surprises many applicants — but remember the pregnancy household bump and the Medicaid shortcut before ruling yourself out.'],
      ['Do my baby\'s father\'s earnings count if we live together?', 'If you live together and share expenses, yes — he is part of the economic household. If he lives elsewhere, only the support he actually pays you counts.'],
      ['Did the limits go up for 2026-2027?', 'Yes — the table adjusts every July with the federal poverty guidelines. A family of 4 went from $59,478 to $61,050. If you were denied under the old table and are close, it is worth reapplying.']
    ]
  },
  {
    slug: 'how-to-apply-for-wic',
    title: 'How to Apply for WIC in 2026: Steps, Documents and What to Expect',
    short: 'How to apply',
    icon: 'fa-clipboard-check',
    hook: 'You apply at a local clinic, not online-only — here is the whole process.',
    quick: 'WIC enrollment happens through your local clinic: (1) find your nearest clinic and call or use your state\'s online pre-application; (2) book a certification appointment; (3) bring ID, proof of address, proof of income (or your Medicaid/SNAP card), and the children applying; (4) a short health and nutrition assessment is done free at the clinic; (5) if eligible, benefits load onto an eWIC card the same day in most states. Dads, grandparents and foster parents can apply for children in their care.',
    desc: 'Step-by-step WIC application in 2026: finding your clinic, the documents you need, the certification appointment, the free health check, and how fast the eWIC card arrives.',
    body: [
      ['p', 'WIC is one of the last programs where a local office visit does the whole job — which is actually good news: decisions are same-day, and the clinic is where you\'ll pick up nutrition support anyway. Here\'s the path, minus the confusion.'],
      ['h2', 'Step 1: Find your clinic and make contact'],
      ['p', 'Every county has WIC clinics — health departments, community centers and hospitals. <a href="/find/">Find yours here</a> with direct phone numbers. Many states now offer online pre-applications or phone screenings that fast-track your appointment; the clinic will tell you when you call.'],
      ['h2', 'Step 2: Gather four things'],
      ['ul', ['<strong>Identity:</strong> photo ID for you; birth certificate, crib card or medical record for children.', '<strong>Residency:</strong> a utility bill, lease or mail with your address — you apply in the state where you live, no minimum time required.', '<strong>Income:</strong> recent pay stubs or benefit letters — <em>or simply your Medicaid, SNAP or TANF card</em>, which proves income eligibility by itself. Full details in the <a href="/wic-income-guidelines/">income guide</a>.', '<strong>The applicants:</strong> children must generally come to the first appointment for the health check.']],
      ['h2', 'Step 3: The certification appointment'],
      ['ol', ['Paperwork review (10 minutes) — the staff confirms identity, address and income.', 'Free health and nutrition assessment: height, weight, and a simple blood test for iron levels, plus questions about eating habits. This determines "nutritional risk" — and almost every applicant meets at least one criterion.', 'If eligible, you\'re certified on the spot: benefits are set for 6-12 months depending on your category.']],
      ['h2', 'Step 4: The eWIC card'],
      ['p', 'Benefits load onto an eWIC card (like a debit card) that works at authorized grocery stores. Most states issue it at that same first appointment. Monthly benefits refresh automatically; you shop with the card and the WIC app shows your balance. What you can buy: see <a href="/what-does-wic-cover/">what WIC covers</a>.'],
      ['h2', 'Who can apply'],
      ['ul', ['Pregnant women (any stage), and new mothers up to 6 months postpartum — or a full 12 months if breastfeeding.', 'Infants, and children until their 5th birthday.', '<strong>Any caregiver</strong> can apply for an eligible child: fathers, grandparents, foster parents and legal guardians. WIC is not mothers-only.', 'Citizenship is <strong>not</strong> required, and WIC is not part of any public charge test.']]
    ],
    faq: [
      ['Can I apply for WIC online?', 'Many states offer online pre-applications or screeners, but certification is completed with the clinic (increasingly by video call in modernized states). The clinic finder on this site gets you to the right starting point.'],
      ['How long does approval take?', 'Usually one appointment. Federal rules require processing within 20 days at most — pregnant women and infants are priority within 10 — but same-day certification is the norm when you bring your documents.'],
      ['Does WIC affect immigration status?', 'No. WIC is excluded from public charge determinations, and clinics do not report immigration information. The program is open to eligible families regardless of status.']
    ]
  },
  {
    slug: 'wic-eligibility',
    title: 'WIC Eligibility 2026: Who Qualifies (Including If Your Income Seems Too High)',
    short: 'Who qualifies',
    icon: 'fa-user-check',
    hook: 'Four requirements — and the Medicaid backdoor most families miss.',
    quick: 'You qualify for WIC if you meet all four: (1) category — pregnant, postpartum up to 6 months (12 if breastfeeding), an infant, or a child under 5; (2) residency in the state where you apply; (3) income at or below 185% of poverty OR automatic eligibility through Medicaid, SNAP or TANF; (4) nutritional risk, assessed free at the clinic and met by nearly everyone. Income "too high"? Pregnancy Medicaid reaches up to 278% of poverty in some states — qualify there and WIC follows automatically.',
    desc: 'The four WIC eligibility requirements for 2026 explained: categories, residency, the 185% income rule with its Medicaid/SNAP shortcut, nutritional risk — and what to do if your income seems too high.',
    body: [
      ['p', 'WIC eligibility looks like a wall of rules but reduces to four checkboxes — and the income box has a side door that most "we make too much" families never try.'],
      ['h2', 'The four requirements'],
      ['ol', ['<strong>Category.</strong> WIC serves pregnant women, postpartum mothers (6 months, or 12 while breastfeeding), infants, and children until age 5. Dads and guardians apply <em>on behalf of</em> eligible children.', '<strong>Residency.</strong> You apply in your state of residence — no minimum duration, no citizenship requirement.', '<strong>Income.</strong> At or below 185% of federal poverty (<a href="/wic-income-guidelines/">current table</a>) — or automatic via Medicaid, SNAP or TANF.', '<strong>Nutritional risk.</strong> Determined free at the clinic: anemia, weight concerns, dietary gaps, pregnancy complications — the criteria are broad by design, and meeting one is enough.']],
      ['h2', '"Our income is too high" — the checklist before you give up'],
      ['ul', ['<strong>Medicaid = automatic WIC income eligibility.</strong> Pregnancy Medicaid ceilings run far above WIC\'s 185% in most states (up to ~278% of poverty). If you\'re pregnant and anywhere near the line, apply for Medicaid first.', '<strong>Recount the household.</strong> Pregnancy adds at least one member; each member raises the annual limit by $10,508.', '<strong>Recent income drop?</strong> Clinics can use current income, not last year\'s — a job loss or reduced hours can qualify you today.', '<strong>One eligible member is enough:</strong> if your child receives Medicaid, the child is income-eligible for WIC even if the parents\' coverage differs.']],
      ['h2', 'What eligibility gets you'],
      ['p', 'Monthly food benefits on an eWIC card, healthcare referrals, breastfeeding support (including pumps), and nutrition counseling — detailed in <a href="/what-does-wic-cover/">what WIC covers</a>. Certification lasts 6-12 months, then renews with a shorter recheck.'],
      ['h2', 'WIC and other programs stack'],
      ['p', 'WIC combines freely with SNAP, Medicaid and school meals — none reduces the others. If you\'re choosing where to start, the <a href="/wic-vs-snap/">WIC vs SNAP comparison</a> shows how they differ and why most eligible families should hold both.']
    ],
    faq: [
      ['Do I qualify if I\'m pregnant but have no children yet?', 'Yes — pregnancy alone is a qualifying category from the moment it\'s confirmed, and you count as a household of at least 2 for income.'],
      ['My child is 4 — is it too late?', 'Children are eligible until their 5th birthday. Even a few months of benefits are worth an appointment.'],
      ['Does immigration status matter?', 'No for the applicant\'s eligibility, and WIC is excluded from public charge rules. Clinics serve eligible families regardless of status.']
    ]
  },
  {
    slug: 'what-does-wic-cover',
    title: 'What Does WIC Cover in 2026? Foods, Formula, and Everything Else',
    short: 'What WIC covers',
    icon: 'fa-basket-shopping',
    hook: 'Much more than milk and cereal — including formula, produce money and breast pumps.',
    quick: 'WIC provides monthly food packages on an eWIC card: milk, eggs, whole grains, cereal, juice, beans, peanut butter, canned fish, plus a cash value benefit for fruits and vegetables. Infants get iron-fortified formula (a major expense covered in full for formula-fed babies) or enhanced food for breastfeeding mothers. Beyond food: free nutrition counseling, breastfeeding support with pumps, health screenings and referrals. WIC does not cover diapers, wipes or prepared baby meals beyond approved lists.',
    desc: 'Complete list of what WIC covers in 2026: the monthly food package, infant formula, the fruit and vegetable benefit, breastfeeding support and pumps — plus what WIC does not pay for.',
    body: [
      ['p', 'The dollar value of WIC surprises people: between formula, the monthly package and produce dollars, a family with an infant can receive several hundred dollars\' worth of groceries a month. Here\'s the full inventory.'],
      ['h2', 'The monthly food package'],
      ['ul', ['<strong>Staples:</strong> milk (or soy/lactose-free), cheese, yogurt, eggs, whole-grain bread or tortillas, breakfast cereal, juice, dried or canned beans, peanut butter.', '<strong>Fruits & vegetables:</strong> a cash value benefit loaded monthly — spend it on fresh, frozen or canned produce of your choice.', '<strong>For breastfeeding mothers:</strong> enhanced packages with extra foods plus canned fish.', '<strong>State-approved brands:</strong> each state publishes an approved product list; the WIC shopping app scans barcodes so you know before checkout.']],
      ['h2', 'Infant benefits — the big one'],
      ['ul', ['<strong>Iron-fortified formula covered in full</strong> for formula-fed infants — routinely $150-250/month at retail.', 'Specialty and medical formulas with a doctor\'s note.', 'From 6 months: infant cereal and jarred baby fruits and vegetables.', 'Fully breastfed babies\' mothers get the largest food package plus a cash produce benefit and priority support.']],
      ['h2', 'Beyond the groceries'],
      ['ul', ['<strong>Breastfeeding support:</strong> lactation counselors, peer programs, and <strong>breast pumps</strong> (manual or electric based on need) at no cost.', '<strong>Nutrition education:</strong> practical sessions, increasingly online or by app.', '<strong>Health screenings and referrals:</strong> growth checks, iron testing, immunization review, and connections to Medicaid, SNAP and pediatric care.']],
      ['h2', 'What WIC does NOT cover'],
      ['p', 'Diapers, wipes, clothing, or general groceries outside the approved lists. The eWIC card only approves listed items at the register — no surprise charges, but no flexibility outside the package either. For broader grocery help, WIC pairs with SNAP: see <a href="/wic-vs-snap/">the comparison</a>.']
    ],
    faq: [
      ['How much is the fruit and vegetable benefit?', 'The cash value benefit varies by category and is adjusted over time — children and pregnant/postpartum women each get a monthly produce amount on the card. Your clinic confirms current values at certification.'],
      ['Can I choose any formula brand?', 'Each state contracts a primary formula brand that WIC covers by default; other or specialty formulas need medical documentation. The clinic handles the paperwork with your pediatrician.'],
      ['What happens to unused benefits?', 'Most benefits expire at the end of each monthly cycle and don\'t roll over — the WIC app shows your remaining balance so nothing is left on the table.']
    ]
  },
  {
    slug: 'wic-vs-snap',
    title: 'WIC vs SNAP: Differences, Which to Apply for First, and Why Both',
    short: 'WIC vs SNAP',
    icon: 'fa-scale-balanced',
    hook: 'Different programs, different rules — and stacking them is the whole point.',
    quick: 'SNAP is broad grocery help for households of any composition, loaded monthly on an EBT card for almost any food. WIC is targeted nutrition for pregnancy through age 5: specific healthy foods, formula, produce dollars and clinical support. Different agencies, different applications, fully stackable — receiving one never reduces the other, and having SNAP automatically satisfies WIC\'s income test. If you\'re pregnant or have a child under 5, apply for both; SNAP first if you need broad help, since it unlocks WIC income eligibility instantly.',
    desc: 'WIC vs SNAP in 2026: eligibility, what each covers, EBT vs eWIC, how the two stack, and the order to apply in for a family with young children.',
    body: [
      ['p', 'These two get confused constantly because both load groceries onto a card — but they answer different questions. SNAP asks "does this household need food help?" WIC asks "does this pregnancy or young child need nutrition support?" Many families should answer yes to both.'],
      ['h2', 'Side by side'],
      ['table', [
        ['', 'WIC', 'SNAP'],
        ['Who', 'Pregnant/postpartum women, infants, children under 5', 'Households of any type'],
        ['Income limit', '185% of poverty (or Medicaid/SNAP/TANF = automatic)', 'Generally 130% gross / 100% net, state variations'],
        ['What you buy', 'Specific package: formula, milk, grains, produce benefit', 'Nearly any grocery food'],
        ['Card', 'eWIC (approved items only)', 'EBT (broad)'],
        ['Extras', 'Nutrition counseling, breastfeeding support, pumps, referrals', 'Employment programs in some states'],
        ['Where to apply', 'Local WIC clinic', 'State SNAP office / online portal'],
        ['Recertification', 'Every 6-12 months', 'Every 6-12 months, state rules']
      ]],
      ['h2', 'The stacking rule'],
      ['ul', ['Benefits are <strong>fully independent</strong> — WIC never lowers your SNAP amount, and vice versa.', '<strong>SNAP membership makes you income-eligible for WIC automatically</strong> (adjunctive eligibility). Same for Medicaid and TANF.', 'At the register: eWIC pays the approved items first, EBT covers the rest of the cart. Cashiers process both routinely.']],
      ['h2', 'Which to apply for first'],
      ['ol', ['<strong>Need broad grocery help?</strong> SNAP first — bigger dollar impact, and approval instantly satisfies WIC\'s income test.', '<strong>Pregnant or formula-feeding?</strong> Don\'t wait on SNAP\'s processing: <a href="/find/">book the WIC appointment now</a> — formula coverage alone justifies it, and WIC certification is usually same-day.', 'Ideal: submit SNAP online today, WIC appointment this week, bring the SNAP approval (or Medicaid card) when it lands.']],
      ['h2', 'Common myths, quickly'],
      ['ul', ['"WIC is only for mothers" — any caregiver applies for an eligible child, including fathers and grandparents.', '"You can\'t get both" — you can, and the programs are designed to combine.', '"WIC affects immigration status" — it does not; WIC is excluded from public charge rules.']]
    ],
    faq: [
      ['Can I use WIC and SNAP in the same purchase?', 'Yes — the register applies eWIC to approved items first and EBT to the remainder. Tell the cashier you\'re paying with both.'],
      ['I was denied SNAP — is WIC off the table?', 'Not at all. WIC\'s 185% limit is far more generous than SNAP\'s, and the pregnancy household bump helps further. Many SNAP-denied families qualify for WIC directly.'],
      ['Do WIC and SNAP share one application?', 'No — separate agencies and applications. Some state portals cross-refer you, but assume two applications; each takes well under an hour with documents in hand.']
    ]
  },
  {
    slug: 'wic-appointment',
    title: 'Your WIC Appointment: What to Bring and What Actually Happens',
    short: 'The appointment',
    icon: 'fa-calendar-check',
    hook: 'Forty-five minutes, four documents, and most families walk out certified.',
    quick: 'A first WIC appointment (certification) takes 30-60 minutes: document check, a free health and nutrition assessment (height, weight, iron test), and benefit setup on your eWIC card — usually the same day. Bring photo ID, proof of address, proof of income (or your Medicaid/SNAP/TANF card), and the children applying. Missed appointments can be rescheduled without penalty, and many states now offer video certifications.',
    desc: 'What happens at a WIC certification appointment in 2026: the documents to bring, the free health check, how long it takes, same-day eWIC cards, and rescheduling rules.',
    body: [
      ['p', 'Knowing the script beforehand turns a stressful visit into a routine one. Here is the whole appointment, minute by minute.'],
      ['h2', 'The four things to bring'],
      ['ul', ['<strong>Photo ID</strong> for the adult; birth certificate, hospital record or crib card for children.', '<strong>Proof of address:</strong> a lease, utility bill or official mail.', '<strong>Proof of income:</strong> recent pay stubs or benefit letters — or your <strong>Medicaid, SNAP or TANF card</strong>, which settles income by itself (<a href="/wic-income-guidelines/">current limits</a>).', '<strong>The applicants:</strong> children generally attend the first visit for their measurements; check if your clinic offers video options.']],
      ['h2', 'The appointment, step by step'],
      ['ol', ['<strong>Check-in and paperwork</strong> (~10 min): eligibility confirmation.', '<strong>Health assessment</strong> (~15 min): height/weight for children, a finger-stick iron check, and questions about eating patterns. Free, gentle, and done by clinic staff.', '<strong>Nutrition conversation</strong> (~10 min): your family\'s needs — this is where formula choices, breastfeeding plans and food package options get tailored.', '<strong>Card and training</strong> (~10 min): eWIC card issued and loaded in most states, plus the shopping app walkthrough. First grocery run: that same day if you like.']],
      ['h2', 'Practical notes'],
      ['ul', ['Missed appointments are rescheduled without penalty — clinics expect life with small children.', 'Interpretation services are available; ask when booking.', 'Certifications last 6-12 months; recertification visits are shorter.', 'Between visits, the WIC app handles balances and appointment reminders in most states.']],
      ['h2', 'Booking one'],
      ['p', '<a href="/find/">Find your nearest clinic</a> and call — many states also take online appointment requests. If you\'re pregnant or have a formula-fed infant, say so: those categories get priority scheduling, with federal rules capping the wait at 10 days.']
    ],
    faq: [
      ['Do I need my kids with me at every appointment?', 'Mainly the first certification and periodic health checks. Many states allow video recertifications and proxy pickups in between — ask your clinic.'],
      ['What if I don\'t have all the documents?', 'Go anyway. Clinics can start with what you have; a sworn statement is generally accepted as a last resort, and you typically get 30 days to complete proof after enrollment.'],
      ['Is the blood test mandatory?', 'The iron screening is a standard part of nutritional risk assessment, done with a quick finger stick. If it\'s been done recently by your doctor, records can substitute — bring them.']
    ]
  }
];
