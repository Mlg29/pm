import BackButton from "../components/BackButton";
import { COLORS } from "../utils/colors";
import { FONTS } from "../utils/fonts";
import { FlexDirection } from "../utils/type";

export const styles = {
  container: {
    padding: "0px 20px",
    height: "100vh"
  },
  line: {
    display: "flex",
    flexDirection: "row" as FlexDirection,
    justifyContent: "space-between",
    alignItems: "center",
    padding: "30px 20px 0px 20px",
  },
  active: {
    backgroundColor: COLORS.primary,
    width: 60,
    height: 5,
    borderRadius: 10,
  },
  inactive: {
    backgroundColor: COLORS.semiGray,
    width: 60,
    height: 5,
    borderRadius: 10,
  },
  bottom: {
    display: "flex",
    flexDirection: "column" as FlexDirection,
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 0px 10px 0px",
  },
};

const TermsAndConditions = () => {
  return (
    <div style={{ ...styles.container }}>
      <div style={{ marginTop: 10 }}>
        <BackButton />
      </div>
      <div>
        <h3
          style={{
            ...FONTS.h2,
            fontWeight: "bold",
            textAlign: "center",
            margin: "10px 0px 20px 0px",
          }}
        >
          Terms and Conditions
        </h3>
        <p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>1.     General</p>
        <p style={{ marginTop: "10px" }}>
          1.1.   These Terms and Conditions together with all extensions (e.g.
          supplementary terms, rules, policies etc.) incorporated herein by
          reference (all together – the “T&C”) constitute a binding agreement
          between us (“We”, “Us”, “Our(s)” and variants of the same) – PhaseNet
          Innovation LTD., a company registered under the laws of the Federal
          Republic of Nigeria with registered The Registered Address PLOT 1,
          JOMARTAK INDUSTRY LAYOUT, ODO-ONA NLA, IDI AYUNRE, IBADAN, OYO STATE,
          NIGERIA and you (“You”, “Your(s)” and variants of the same) – a person
          accessing and using this website (the “Website”), and/or the online
          account on the Website (the “Account”), and/or any gaming and gambling
          product, betting service or other services or products available on
          the Website (the “Game(s)”).
        </p>
        <p style={{ marginTop: "10px" }}>
          1.2.   In the course of Game provisions, We are operating the License
          by The National Lottery Regulatory Commission. The Website and Games,
          as between You and Us, are owned and operated by Us.
        </p>
        <p style={{ marginTop: "10px" }}>
          1.3.   The T&C comes into force between You and Us upon Your visiting
          the Website which shall be deemed Your acknowledgement and
          confirmation to Us that You have read the T&C, understand them and
          accept them as is for the time being without any reservation from Your
          side.
        </p>
        <p style={{ marginTop: "10px" }}>
          1.4.   Please note that each Game available on the Website may be
          subject to individual Game rules in which case such rules shall be
          deemed integral part of the T&C, but solely in terms of using such
          exact Game. Your using of any Game on the Website shall constitute
          Your acknowledgement and confirmation to Us that You have read all
          supplementary rules concerning such a Game (if any), understand them
          and accept them as is for the time being without any reservation from
          Your side. The said rules may either be displayed within a Game
          interface (e.g. under “?”, “i”, “how to play”, “info” or similar link
          or button) or be provided in a separate page or section of the
          Website.
        </p>
        <p style={{ marginTop: "10px" }}>
          1.5.   All dates and times referred to in the T&C are based on GMT+1,
          unless otherwise is defined explicitly for the specific cases.
        </p>
        <p style={{ marginTop: "10px" }}>
          1.6.   Please note that the use of the Website in general and/or
          certain Game on the Website may be prohibited for the residents of
          certain jurisdictions. For example, the Website and Games are
          prohibited and, therefore, are not offered for use to the residents
          of, and persons located in, without limitation, Aruba, Bonaire,
          Curaçao, France, The Netherlands, Saba, Statia, St. Maarten,
          Singapore, USA, Israel, Singapore, Estonia, the Republic of Cyprus,
          the United Kingdom of Great Britain and Northern Ireland, Italy,
          Kahnawake Mohawk Territory (Canada), (the list is not exhaustive).
        </p>
        <p style={{ marginTop: "10px" }}>
          1.7.   The restrictions may be imposed by the T&C, the Authority, laws
          applicable to either You or Us, individual Game rules or otherwise.
          You agree that You are solely responsible to find out whether You are
          allowed to use the Website and Games, as well as whether it is lawful
          to provide the Website and Games, in the jurisdiction You are residing
          or being located in for the time being. Should either Your use of the
          Website and/or Games, or Our provision of the same is illegal in the
          jurisdiction You are residing or being located in for the time being,
          You shall not use the Website and the Games.
        </p>
        <p style={{ marginTop: "10px" }}>
          1.8.   We use Our commercially practicable efforts to implement the
          effective measures to prevent users from the restricted jurisdictions
          to access and use the Website and Games as might be needed. However,
          the availability of the Website and Games in any such jurisdiction
          shall not in any way be interpreted as an offer or invitation on Our
          part to use the Website and/or Games from any such territory.
        </p>
        <p style={{ marginTop: "10px" }}>
          1.9.   The T&C may be unilaterally amended by Us at any time at Our
          sole discretion for any or no reason. We will use commercially
          practicable efforts to notify You of any significant changes by email.
          However, it shall be Your sole responsibility to regularly review the
          T&C in order to check any possible amendments. Even without the
          notification, Your continuous use of the Website or Game shall be
          deemed acceptance of all then-current amendments of the T&C as is for
          the time being without any reservation from Your side.
        </p>

        <p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
          2.     Account registration
        </p>

        <p style={{ marginTop: "10px" }}>
          2.1.   To use the Website and to participate in any Game You need
          first to register an Account. Registration of an Account is to be made
          by filling the registration form (You shall enter all mandatory
          information requested in the registration form) and submitting it to
          Us through the Website.
        </p>
        <p style={{ marginTop: "10px" }}>
          2.2.   You are allowed to register only one (1) Account. Please note
          that Accounts with the same email address and/or telephone will be
          considered as Accounts of the same person. You shall use only an
          Account that You personally created in Your own name, shall not allow
          any other person to use Your Account, and shall not create and/or use
          an Account on behalf of another person. You may not transfer or assign
          Your Account to any other person.
        </p>
        <p style={{ marginTop: "10px" }}>
          2.3.   We reserve the right to refuse You to open an Account for any
          or no reason at Our sole and absolute discretion.
        </p>
        <p style={{ marginTop: "10px" }}>
          2.4.   By creating an Account, You represent and warrant that: You
          have read the T&C (including any supplementary documents available on
          the Website and/or otherwise provided to You in connection with the
          use of the Website and the Games) and You understand and agree that
          Your use of the Website and Games will be governed by the T&C as might
          be amended from time to time;
        </p>

        <ul>
          <li>
          {" "}
            You are over eighteen (18) years old or such higher minimum legal
            age as stipulated in the laws applicable to You (including the laws
            of Your nationality, registration, domiciliation or otherwise), and
            You are legally allowed to participate in the Games offered on the
            Website;{" "}
          </li>
        </ul>
        <ul>
          <li>
            {" "}
            You are not a resident of and do not domicile temporary in a
            jurisdiction where Your use of the Website or the Game, or Our
            provision thereof, considered illegal and in conflict with any
            applicable law, and You will not access or use the Website or play
            the Games from any of those jurisdictions;
          </li>
        </ul>

        <ul>
            <li>
            You are not precluded to use the Website as a result of Your personal status or for any other reason, and acceptance by You of the T&C, use of the Website in any manner does not and will not violate any law, regulations or rule applicable to You in any other manner; and it will be Your sole responsibility at Your own cost to enquire and ensure that You do not breach any laws or regulations by using the Website, participating in the Games etc.;
            </li>
        </ul>

        <ul>
            <li>You will use the Website and the Account solely and exclusively for the purpose of participation in the Games in personal non-professional capacity for recreational and entertainment purposes (the “Permitted Purpose”) and not for any financial or other reason, You understand that by participating in the Games You take the risk of losing money paid for the participation in the Game;
</li>
        </ul>

<ul>
    <li>
    You possess the expertise and knowledge necessary to make informed decisions in respect of bets, stakes and wages, as well as use of and play the Games, and You will not rely on any communication or statement (written, verbal etc.) made by Us as financial, game or investment advice or as a recommendation to enter into and play/use any of the available Games;
    </li>
</ul>

<ul>
    <li>You register on the Website and will at all times participate in the Games offered on the Website exclusively on Your own behalf and not on behalf of any other person, and will not allow third person to use Your account;</li>
</ul>

<ul>
    <li>
    All money that You deposit into the Account are not derived from, and in no manner connected to, any illegal activity or source, including through money laundering, and that no transaction with use of the Account are and will be used to facilitate a criminal or illegal activity, including, but not limited to, money laundering and financing terrorism;
    </li>
</ul>

<ul>
    <li>
    You will at all times adhere to the general principles of a fair play, will not be involved in any fraudulent, collusive, fixing or other unlawful activity in relation to Your or third parties’ participation in any of the Games and shall not use any software-assisted methods or techniques, or hardware devices in connection with Your participation in any of the Games;  
    </li>
</ul>

<ul>
    <li>
    For security purposes You will bear the sole and complete responsibility for keeping the password and other access details and instruments for Your Account secret and undertake all measures to avoid their coming into the knowledge and/or possession of a third person;
    </li>
</ul>

<p>
In case of breach of any of the above representation and warranties, We reserve the right to withhold all monies from Your Account balance as indemnification of Our damages and loses resulting from Your breach, which shall in no event restrict Us from further claims for damages and loses not covered by the withheld amount. Furthermore, we expressly disclaim any and all liability and shall not reimburse any losses, damages, or expenses resulting from You use of the Website in a breach of the mentioned above warranties and representations, and You acknowledge the mentioned disclaimer;
</p>

<p style={{ marginTop: "10px" }}>
2.5.   We guarantee to keep all information concerning You as a user of the Website and Your Account details secret and will not disclose it to any third party, unless otherwise is permitted or required by applicable laws and/or the T&C, including but not limited upon the Authority’s request; for the purposes of conducting Your identification or verification etc. You, however, agree that it will be Your ultimate responsibility and liability to keep Your password and other Account access details secret. You agree to undertake all measures to prevent its disclosure to any third person. Any operations and transactions using Your Account will be deemed valid and official, and performed by You, therefore, under no circumstances shall such operations and transactions be cancelled, regardless of any allegation of access details loss or compromising. If at any time You believe that Your access details are lost and/or any third party has got access to it, please contact Our Customer Support and request for a change of then-current access details.
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}> 
3.        Identification and verification 
</p>

<p style={{ marginTop: "10px" }}>
3.1.   For the purpose of compliance with applicable regulation, as well as public and internal AML and KYC standards, We have the right to conduct Your initial and any further identification and verification, as well as credit checks at any time (including upon registration of Your Account, upon Your top up attempt and/or withdrawal request, at any other time, upon change of Account details etc.) and for this purpose to request from You any identification and other documents as might be needed at Our sole and absolute discretion.
</p>

<p style={{ marginTop: "10px" }}>
3.2.   We reserve the right to use and process any information and personal data of You for the purposes of performing any such checks and identification, and verifications as might be needed, including but not limited to refer to bad-debtors data bases etc. The rules and procedures for storing and processing any such information and personal data are detailed and will be at all times maintained pursuant to Our Privacy Policy, which is acknowledged and accepted by You when You start Using the Website. 
</p>

<p style={{ marginTop: "10px" }}>
3.3.   For the above purposes You agree to provide to Us all such information and documents as might be requested by Us at Our sole and absolute discretion from time to time. Such documents and information may include, without limitation:
</p>

<ul>
    <li>
    copy of Your valid passport and/or ID;
    </li>
    <li>
    proof of residence (e.g. a utility bill not older than six (6) months);
    </li>
    <li>
    proof of source of funds (including details of a payment account to be used to make deposits to and withdrawals from the Account);
    </li>
    <li>
    proof of source of wealth (financial standing);
    </li>
    <li>
    tax identification number;
    </li>
    <li>
    Contact details.
    </li>
</ul>

<p style={{ marginTop: "10px" }}>
3.4.   The documents for identification and verification may be uploaded via the Account.
</p>
<p style={{ marginTop: "10px" }}>
3.5.   A first name, a last name, a photo, a date of birth, a serial number of a document have to be clearly visible on the documents and copies provided. Only color photos of documents can be accepted (black-and-white scans and copies of documents are not allowed). Document pages have to be visible completely. We reserve the right to request You to provide documents in a certain form, e.g. in certified form, ask You to make a selfie with a document and/or selfie with a specific notice etc. Acceptable documents’ language is English, unless We at Our sole discretion decide to consider documents in other languages. The documents shall be provided in jpg/jpeg file format no larger than 400KB each.
</p>
<p style={{ marginTop: "10px" }}>
3.6.   We reserve the right to otherwise verify any information and documents provided to Us for the purposes of identification and verifications. For instance, We have the right to make a phone call or otherwise verify Your contact details used for the registration of the Account.
</p>
<p style={{ marginTop: "10px" }}> 
3.7.   We may request any documents previously provided by You which would have later on expired or would no longer be valid for any reason, or to request any additional documents for any reason and at any time. However, it is Your sole responsibility to ensure that the information You provide to Us is true, complete and correct, and maintained up-to-date at all times and You hereby represent and warrant to Us that the information provided is and will be true, complete, correct and maintained up-to-date at all times.
When the identification and verification procedures have been commenced, We reserve the right to suspend any transactions on the Account until verification process is completed to Our satisfaction. Should You fail to complete identification and verification successfully, Your Account shall be deemed fraudulent and We reserve the right to suspend or close it and withhold all funds as indemnification of Our damages and loses resulting from Your fraudulent activity, which shall in no event restrict Us from further claims for damages and loses not covered by the withheld amount.

</p>
<p style={{ marginTop: "10px" }}>
3.8.   We reserve the right to verify You using the services and/or verification systems of third parties. In case of Enhanced verification the client should provide all the requested documents within 1 calendar month (after initiation of such verification). The Operator reserves the right to write-off any winnings from the Player's account at its sole discretion and restrict or even close the account if the client fails to provide requested documents.

</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
4.       Currency, conversions and rounding
</p>

<p style={{ marginTop: "10px" }}>
4.1.   The operational currency of Your Account will be in Nigerian Naira (NGN), if you sign up/reside in Nigeria, or United State Dollar (USD), if you sign up/reside outside Nigeria ; all financial transactions with Your Account will be in the said currency. For example, all top ups of Your Account, regardless of the currency of respective payment transaction, will be converted and credited on Your Account in NGN or USD based on your country of residence. All possible bets, wins, bonuses and withdrawals will also be settled and processed in NGN or USD based on your country of residence. When applicable (e.g. when the currency of the transaction is different to the currency the Website assigned to you based on your country of residence, the conversion is to be performed at Our internal exchange rate based on the exchange rate of Our banks. You acknowledge and agree that, sometimes double conversion may occur (include on the side of a used payment service provider) for which reason, even in the event Your transaction is performed in NGN/USD, the amount credited to Your Account balance may differ from the amount instructed by You to be transferred.
</p>

<p style={{ marginTop: "10px" }}>
4.2.   We do not allow You to have multiple-currency Accounts and You will have no option to change the Account currency. 
</p>

<p style={{ marginTop: "10px" }}>
4.3.   All top up and withdrawal payment transactions connected with the use of the Website will always be subject to (in addition to the provisions of the T&C) the relevant payment service provider’s service terms. We shall in no event be liable for any withholdings, charges, fees, conversion loses etc. occurred pursuant the service terms of payment service provider chosen by You for processing of top up or withdrawal transactions.
</p>

<p style={{ marginTop: "10px" }}>
4.4.   We apply a rounding, for this purpose We reserve the right at any time to round down all amounts credited to Your Account balance (including, top ups, wins and bonuses) to no more than two (2) decimal places.
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
5.       Games participation and account balance management
</p>

<p style={{ marginTop: "10px" }}>
5.1.   Subject to continuous compliance with all provisions of the T&C, You may use Your Account for participation in Games available on the Website. You acknowledge that Games are real money games, and when You wish to participate in Games available on the Website (except for using their demo, if any) You need to pay a participation fee (the “Bet”) which will be charged from Your Account balance. You expressly agree and authorize Us to set off against Your Account balance any amounts of Your Bets, as well as other amounts You owe Us.

</p>

<p style={{ marginTop: "10px" }}>
5.2.   We grant no warranties of any Game results and You acknowledge that participation in Games on the Website may result in Your financial losses and We shall have no liability for any such losses.
</p>

<p style={{ marginTop: "10px" }}>
5.3.   Unless otherwise provided for under the T&C and/or individual Game rules, for participation in a Game, You need to place a Bet of amount You have chosen at Your sole discretion (subject always to the minimum and maximum Bet amounts allowed in the Game in question) and apply for participation according to respective Game rules.
</p>

<p style={{ marginTop: "10px" }}>
5.4.   We are entitled to either approve or decline Your application for participation in a Game at Our sole and absolute discretion. Your participation in a Game shall be deemed approved only after it is recorded and validated by Our gaming platform. Unless otherwise is set forth by the T&C (including applicable Game rules) an application for participation in a Game cannot be amended or cancelled.

</p>

<p style={{ marginTop: "10px" }}>
5.5.   You acknowledge that communication errors may from time to time take place. Therefore, applications shell be deemed approved when, and shall not be deemed so until, duly recorded and validated by Our gaming platform. Should there be a break in communication after You apply for participation in a Game which has been thereafter duly approved, Your participation shall be deemed effective. If Your application has not been recorded and/or validated by Our gaming platform then it shall be deemed declined and withheld Bet (if any) will be credited back to Your Account balance.

</p>

<p style={{ marginTop: "10px" }}>
5.6.   Depending on the result of the Game (event(s), round, spin etc.), You may be entitled to receive a monetary award for Your participation (the “Win”) subject always to, and in accordance with, relevant Game rules (usually, but not always, for correct predictions regarding the Game results). For the avoidance of doubts, regardless of a Game results, You shall not be entitled for any Win if the result of the Game occurred due to any mistake on Our side (e.g. hardware, software or human error etc.), and/or Your fraudulent actions, and/or bad faith or unfair actions of any third persons (e.g. match fixing, collusion etc.) and/or if You are or have been in a breach of the T&C.
</p>

<p style={{ marginTop: "10px" }}>
5.7.   Win will be calculated as respective Bet amount multiplied by the win coefficient (2) assigned to the result of the Game according to the relevant Game rules (subject always to the maximum Win amounts allowed in the Game in question). Win amount minus the admin fee and where applicable, Fx and processing fee, will be credited to Your Account balance. When there is no winner for a game (bet), bet amount will be credited to Your Account balance.

</p>

<p style={{ marginTop: "10px" }}>
5.8.   Each Your application for participation in a Game shall be deemed Your acknowledgement and confirmation that You have read, understand in full and agree with the T&C and applicable individual Game rules as is for the time being without any reservation from Your side.
 
</p>

<p style={{ marginTop: "10px" }}>
5.9. Minimum bet amount for wagering is the equivalent of two hundred NGN (NGN 200). The maximum bet amount for each event depends on the event and the sport. The maximum bet amount will be defined by the Betting company individually for each event and wagering form and it can be changed without giving written notice. The Betting company reserves the right to limit the maximum bet amount for certain events and change the betting limits for individual Clients without notice.
Maximum payout for one bet is equivalent of thirty million NGN (NGN 30,000,000) in the gaming account currency. Betting company reserves the right to increase the payout maximum limit and amount for certain events and change the payout maximum limit and amount for individual Clients without notice.
  
</p>


<p style={{ marginTop: "10px" }}>
5.10. For the avoidance of doubts, in the event the T&C and applicable Game rules stipulates different limits and restrictions, all non-contradictory limits and restrictions shall apply cumulatively and all contradictory ones shall apply on a “the-most-strict” basis. 
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
6.       TOP UPs and Withdrawals
</p>

<p style={{ marginTop: "10px" }}>
6.1.   To top up Your Account balance You need to make a deposit with real money pursuant to the T&C. You may deposit money to Your Account only for the Permitted Purpose as defined above. Please note that only You may deposit funds to Your Account and no other person shall make transfers or payments to deposit funds to Your Account. All transactions from third parties will not be accepted by Us and will be returned to a payer. In case any such third-party payments have been actually credited to Your Account, You shall promptly notify Us of the same and We will deduct such third-party funds from Your Account balance and hold them until their owner is defined and the funds are returned to them (unless otherwise provided for under Our internal policies and applicable laws).

</p>

<p style={{ marginTop: "10px" }}>
6.2.   You may top up the Account using payment methods available in the “Deposit” section of the Website for the time being. We may set a minimum and maximum top up amount (the minimum and maximum amounts allowed to be deposited through a single payment transaction) and amend them at any time without notice. The then-current minimum and maximum top up amounts will be displayed in the “Deposit” section of the Website for the time being. When no minimum top up amount is displayed in the said section, it shall be deemed that the then-current minimum top up amount is set at the equivalence of NGN 500. The minimum and maximum amounts of a single transaction may also be limited by the provider of a payment method used by You.
</p>

<p style={{ marginTop: "10px" }}>
6.3.   No transfers between the Accounts are permitted. You may not sell or attempt to sell or otherwise transfer any balances in Your Accounts, chips/tokens, bonuses or any other related items to any other persons, and any such sale or transfer shall be deemed void.

</p>

<p style={{ marginTop: "10px" }}>
6.4.   We are not a financial institution and thus should not be treated as such. Your Account balance (as well as amounts being outstanding by Us to You from time to time) will not bear any monetary interest. We do not and will not grant any credit, loan or overdraft for the use of the Website or participating any Game.
</p>


<p style={{ marginTop: "10px" }}>
6.5.   All deposits into the Account shall be from a lawful source of funds and single payment source, such as a credit card, debit card, charge card, bank account, e-wallet or other account of which You are named as an account holder.

</p>

<p>
6.6.   Your Account deposit is considered to be made when the corresponding amount of funds is credited to Our respective account or wallet.
</p>

<p style={{ marginTop: "10px" }}> 
6.7.   Subject to other provisions of this section, You may withdraw funds from the Account (within the amount of Account balance available for withdrawal) using the payment methods available in the “Withdrawal” section of the Website for the time being.
</p>

<p style={{ marginTop: "10px" }}>
6.8.   Any withdrawals from the Account will be transferred by Us only into Your own payment accounts from which the funds were deposited by You before. If the payment account used for making top ups and withdrawals changes or is no longer effective/valid, You are required to make at least a minimum allowed amount top up using Your new account in order to verify it with Us and make it possible to further withdraw funds from Your Account to this payment account.
</p>

<p style={{ marginTop: "10px" }}>
6.9.   Requests for withdrawals shall be made via the Website. We will not accept requests for withdrawal made by telephone, email or otherwise. Any withdrawal from Your Account is considered to be made when the corresponding amount of funds is debited from Our account or wallet. 
</p>

<p style={{ marginTop: "10px" }}>
6.10. Subject to any other provisions of the T&C, We undertake to process all transactions regarding Your top ups and withdrawals as soon as commercially practicable. However, any transfers to and/or from the Account will be additionally subject to the service terms of the chosen payment service provider. You acknowledge that:
  
</p>

<ul>
    <li>
    a credit card issued in countries where Your participation in, or Our provision of, the Games is illegal, cannot be used for the top ups and withdrawals;
 
    </li>

    <li>
    banking and financial institutions, as well as other payment service providers, whether or not in non-supported countries, may block or reject such transactions at their sole discretion, and under no circumstances shall We be liable for any such blocking or rejection;
    </li>
    <li>
    a withdrawal transaction may last up to thirty (30) banking days;
    </li>
    <li>
    some payment methods may not support payments in some specific currencies;
    </li>
    <li>
    withdrawals via bank transfers can in exceptional cases be subject to additional charges by the intermediary banks and We shall not be liable for any such charges
    </li>
</ul>


<p style={{ marginTop: "10px" }}> 
6.11. We reserve the right to suspend and/or cancel any top up, withdrawal, bet and/or block Your ability to perform any transaction:
</p>

<ul>
    <li>
    before Your initial or any subsequent identification and verification is fully performed to Our satisfaction as provided for in the T&C;

    </li>
    <li>
    if the payment service provider rejects to process the relevant payment for any reason;
  
    </li>
    <li>
    if We discover that You are in a breach of any limits or restrictions stipulated by the T&C, imposed either by Yourself or by Us;

    </li>
    <li>
    if We suspect that You are or might be in breach of the T&C or abusing the T&C;
    </li>
    <li>
    in any other cases set forth by the T&C, and/or applicable laws.

    </li>
</ul>

<p style={{ marginTop: "10px" }}>
6.12. You acknowledge and agree that We shall bear no liability for any delays or losses on Your part occurred as a result of payments processing by the payment service provider.
</p>

<p style={{ marginTop: "10px" }}> 
6.13. We may set a minimum and maximum withdrawal amounts (the minimum and maximum amounts allowed to be withdrawn through a single payment transaction) and amend them at any time without notice. Then-current minimum and maximum withdrawal amounts will be displayed in the “Withdrawal” section of the Website for the time being. When no minimum and/or maximum withdrawal amounts are displayed in the said section, it shall be deemed that then-current minimum withdrawal amount is set at the equivalence of NGN 500 and the maximum withdrawal amount is set at the equivalence of NGN 1,500,000
The maximum withdrawal amount through a single transaction may also be limited by the provider of a payment method chosen by You to process a withdrawal, in which case the withdrawal will be performed in instalments (without derogation of Our own withdrawal limits and restrictions set forth herein). Furthermore, You agree that We, due to Our internal operational specifics, shall be entitled at Our sole discretion to split any withdrawal transaction into several transactions (either or not equal).
</p>

<p style={{ marginTop: "10px" }}>
6.14. You agree that the number of withdrawals per day shall not be more than five (5).
</p>

<p style={{ marginTop: "10px" }}>
6.15. Depending on the chosen payment method, relevant payment service providers may establish their own limits for payments processing, which may influence among others the amounts of a single deposit/withdrawal and/or the total amount of deposits/withdrawals which may made within certain period of time etc.

</p>

<p style={{ marginTop: "10px" }}>
6.16. Under no circumstances will You be allowed to transfer funds from Your Account to another Account, or receive funds from another Account.
</p>

<p style={{ marginTop: "10px" }}>
6.17. We use services of payment agents (companies receiving and remitting certain payments for, and on behalf of, Us pursuant to the respective agreement concluded between Us and respective payment agents), which may, at Our sole discretion, act as payment agents for any and all deposits, withdrawals, or other payments to be performed between You and Us. For the avoidance of doubts, any provision of the T&C regarding the payments between You and Us shall be deemed containing the right of Us at any time for any duration at Our sole discretion to appoint a payment agent to receive or remit any portion of payments due between You and Us on Our behalf, and You, using the Website, shall be deemed irrevocably confirming such Our right, and undertake to recognize any such payments to or from a payment agents as proper payments as if such payments were performed directly between the You and Us. For the avoidance of doubts, We may use the services of several payment agents at its sole discretion.
  
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
7.          Wagering requirements
</p>

<p style={{ marginTop: "10px" }}>
7.1.   Money deposited to the Accounts shall be used solely for Permitted Purpose. You hereby acknowledge and agree that for the purpose of Our AML endeavors, when You top up the Account, You shall not withdraw such deposit before fulfilling wagering requirements as follows (We will reject such withdrawals before the fulfilment of the following wagering requirements):
</p>

<ul>
    <p>
    7.1.1.  Unless otherwise expressly stated, the deposit amount shall include the amount of deposit itself and all possible Wins from using such deposit amount (including from using previous Wins from such deposit amount being included to the deposit amount, as stated above).
    </p>
    <p>
    7.1.2.  In order to be able to withdraw the respective deposit amount, You shall, using such deposit amount, participate in Games with total amount of Bets equal to seventy percent (70%) of the amount of the respective deposit (Wins shall not be considered for the calculation of the said percentage). When You have fulfilled the said wagering requirements with respect to a specific deposit, You will be able to withdraw the respective deposit amount. 
    </p>
    <p>
    7.1.3.  If, after fulfilling the wagering requirement regarding any deposit(s), You, before withdrawal of the same, decide to top up the Account with a new deposit amount, such new deposit amount shall also be subject to the same wagering requirements in order to become available for withdrawal. For the avoidance of doubts, You will still be able to withdraw any previous deposit amount(s) in relation to which the wagering requirements has been fulfilled. 
    </p>
    <p>
    7.1.4.  If, before fulfilling the wagering requirement regarding any deposit(s), You decide to top up the Account with a new deposit amount, such a new deposit amount shall also be subject to the same wagering requirements in order to become available for withdrawal. For the avoidance of doubts, the fulfilment of wagering requirements will be considered for each deposit separately on a “first-come-first-served” basis and no Bet for participation in a Game shall be considered as fulfilment of wagering requirements regarding more than a single separate deposit amount
    </p>
    <p>
    7.1.5.  You acknowledge that any Wins from the participation in Games using the exact deposit amount will be included in such used deposit amount and will be available for withdrawal only after Your fulfilling of the wagering requirements regarding such exact deposit amount. 
    </p>
    <p>
    7.1.6.  You acknowledge that, for the purpose of this section, Your deposit amounts will be used in the following order:
    </p>
    <ul>
        <li>
        the deposit amounts with not-fulfilled wagering requirements shall be deemed being used first one after another from the earliest to the latest; and

        </li>

        <li>
        the deposit amounts with fulfilled wagering requirements (which all together shall be deemed the same aggregated deposit amount) shall be deemed being used only after no deposit mounts mentioned in the paragraph above remain.

        </li>
    </ul>
</ul>

<p style={{ marginTop: "10px" }}>
7.2.   We reserve the right at any time at Our sole discretion to impose additional wagering requirements on You.
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
8.       Fees and costs

</p>

<p style={{ marginTop: "10px" }}>
8.1.   As a general rule We do not charge any fees or charges for the top ups and withdrawals. The relevant fees, charges or commissions may be charged, however, by the payment service providers. Therefore, before making a top up and/or ordering any withdrawal, please doublecheck the amount of fees and charges (if any) applicable by a bank or payment service provider, and get ensured that such fees and charges are acceptable for You.
</p>


<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
9.       Refunds
</p>

<p style={{ marginTop: "10px" }}>
9.1.   Refund requests regarding any deposit will be considered according to the relevant refunding policies of the respective payment service provider.
</p>
<p style={{ marginTop: "10px" }}>
9.2.   In case of refund processing, We will cancel all respective bonuses and Wins connected with the amount being refunded.
</p>

<p style={{ marginTop: "10px" }}>
9.3.   In case any transaction is considered by either Us or the respective payment service provider to carry an unacceptable risk for security or legal reasons, We will initiate refunds for all such transactions back to the respective payment account and notify all the appropriate authorities and parties.
 
</p>

<p style={{ marginTop: "10px" }}>
9.4.   All costs that may occur upon a refund procedure shall be borne by You.  
</p>


<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}> 
10.     Dormant Accounts
</p>

<p style={{ marginTop: "10px" }}>
10.1. For the purposes of the T&C an Account shall be deemed “dormant” or the “Dormant Account”, if for more than a twelve (12) consecutive months it has neither been:
</p>

<ul>
    <li>
    deposited by You; nor

    </li>
    <li>
        used by You to participate in any Game.
    </li>
</ul>

<p style={{ marginTop: "10px" }}>
10.2. We will, not less than thirty (30) days before Your Account is due to become dormant, notify You thereon, and remind You of the consequences thereof.
</p>

<p style={{ marginTop: "10px" }}>
10.3. We reserve the right at any time to cancel any and all bonuses, points or accumulations of money in promotions, loyalty programs or other promotional programs benefits allocated to You and remaining at the Dormant Account.

</p>

<p style={{ marginTop: "10px" }}>
10.4. Your Account will be deemed dormant until You either:
</p>

<ul>
    <li>
    make a successful top up; or
    </li>
    <li>
    participate in any Game for Bet. 
    </li>
</ul>

<p style={{ marginTop: "10px" }}>
10.5.    We reserve the right to close any Dormant Account at any time, in which case You will be able to withdraw all remaining Account balance according to the T&C.
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
11.        Anti-Fraud

</p>

<p style={{ marginTop: "10px" }}>
1.1. In order to facilitate following principles of fair play We utilize various anti-fraud tools and techniques. Among others, We consider any of the following activities and practices as fraudulent actions (safe for any and all other actions which may reasonably be considered fraudulent):
</p>

<ul>
    <li>
    participating in any type of collusion with other users/players; 
    </li>
    <li>
    development of strategies aimed at gaining of unfair Game results;
    </li>
    <li>
    participation in Games in cooperation with other persons in order to exceed applicable limits and restrictions;
    </li>
    <li>
    fraudulent actions or any other unlawful activities against other online gaming operators or users/players or payment service providers;
    </li>
    <li>
    placing deposits without an intention to use them for the Permitted Purpose;
 
    </li>
    <li>
    chargeback transactions with a credit card or denial of some payments made;
    </li>
    <li>
    denial and/or requests for the deposit reverse/repayment;
 
    </li>
    <li>
    creating two (2) or more Accounts by one (1) person;

    </li>
<li>
playing from one (1) account by more than one (1) person;

</li>

<li>
connecting to the Website using VPN or similar tools;
</li>

<li>
providing any misleading information or documents to Us; 
</li>

<li>
taking unfair advantage of any bonus offers and/or any other promotions or loyalty programs available on the Website;
</li>
<li>
placing single Bets equal to or in excess of thirty percent (30%) or more of the value of the total balance (including any given bonus) until such time as the wagering requirements for that bonus have been met;
</li>
<li>
    participating in Games, when You are able by any means to influence a result of a Game, or in cooperation with any person which may influence such a result, or being aware of any persons have influenced such a result;
</li>

<li>
advantage gambling (in its widest sense);
</li>
<li>
other types of cheating and unfair game as determined by Us at Our sole discretion;
</li>
<li>
the gaming account is suspected in any activities related to money laundering or other fraudulent activities; 
</li>
<li>
the gaming account is suspected in making irregular (unusual) transactions activity.
</li>

</ul>

<p style={{ marginTop: "10px" }}>
11.2. While using the Website, making any deposits to and/or withdrawals from the Account, participating in Games etc., You agree to adhere to the generally accepted principles of fair play. You shall not make or attempt to make any charge-backs, and/or deny or reverse any payment that You have made to top up the Account, as well as not to handle any other suspicious or fraudulent activities. You shall not take advantage of any Technical Issues (as detailed below) to participate in Games, use or withdraw any amounts mistakenly credited to Your Account, or act otherwise against the generally accepted principles of fair play. You agree to report Us on any discovered Technical Issues immediately.
</p>

<p style={{ marginTop: "10px" }}>
11.3. Should You withdraw any monies resulting from Your or other person’s fraudulent actions, You undertakes to return all such monies to Us.  
</p>
<p style={{ marginTop: "10px" }}>
11.4. We on constant basis will review and analyze Your behavior on the Website for any suspicious and fraudulent actions. The transactions from, to and with the use of the Accounts are and will be checked by Our Compliance and Anti-Fraud departments pursuant to the T&C, our internal policies, and applicable laws and regulations. Your behavior on the Website, deposits and withdrawals may also be checked for any suspicious and fraudulent actions by the relevant governmental and investigation authorities, payment service providers and other third parties as might be stipulated by applicable laws.
</p>

<p style={{ marginTop: "10px" }}>
11.5. You agree to reimburse and to indemnify Us for any losses, expenses and costs incurred by Us as a result of or in connection with any suspicious or fraudulent activities You perform, are involved in or suspected by Us to be involved in, including but not limited to, for any charge-backs, denial or reversal of payments. 
</p>

<p style={{ marginTop: "10px" }}>
11.6. We shall be entitled to inform and in certain cases as provided by applicable laws might be obliged to report the relevant state and governmental authorities of any suspicious or fraudulent actions, and may initiate any legal proceedings and investigations as might be needed to prevent, stop or cure them and/or any negative consequences thereof, including but not limited to initiate debt collection proceedings. However, under no circumstances shall We be liable for any unauthorized use of credit cards, irrespective of whether or not the credit cards were reported stolen.
 
</p>
<p style={{ marginTop: "10px" }}>
11.7. When You are suspected of fraudulent actions, We reserve the right to suspend Your Account and all withdrawals. If the fraudulent actions have been proved, We shall be entitled to withhold all funds from the Account as indemnification of Our damages and loses resulting from Your breach, which shall in no event restrict Us from further claims for damages and losses not covered by the withheld amount. Furthermore, all withdrawals actually made regarding the Wins from the fraudulent actions shall be deemed mistakenly remitted and shall remain Our property, while You shall be obliged to return any such funds. We also reserve the right to inform applicable regulatory bodies of the fraudulent actions performed by You. 
</p>

<p style={{ marginTop: "10px" }}>
11.8. If You have neither performed nor been aware of a fraudulent activity of other persons, but participated in the Game affected by such fraudulent activity and Your Wins from such Games have been therefore distorted due to such fraudulent activity, all such Game results shall be deemed void. In this event, all possible respective Wins will be deducted by Us and all respective Bets amount will be returned to You after the investigation.

</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
12.        Consequences of the breach of the T&C   
</p>

<p style={{ marginTop: "10px" }}>
12.1. Should We find or have reasonable grounds to believe that You become a bankrupt in the country of Your residence, and/or have breached or have attempted to breach the T&C or applicable laws (including, but not limited to, You have committed any fraudulent actions), or have otherwise abused the T&C, and/or any warranty, representation or undertaking giving by You pursuant the T&C is not true or is misleading, without limiting and in addition to any other measures of protection as might be provided for under the T&C and/or applicable laws, We reserve the right to:
</p>

<ul>
    <li>
    reverse any pay-out made and/or recover any Wins;
    </li>
    <li>
    cease to provide You any Game;
    </li>
    <li>
    suspend or withdraw any transaction to, at and/or from the Account, including but not limited to suspend top ups and withdrawals, decline participation in Games, crediting any Wins, allocation of bonuses to the Account balance etc.;
    </li>
    <li>
    impose any additional limits, restrictions and/or requirements for top ups, withdrawals, Bets, Wins, types of Games which You may participate in, frequency and duration of using the Website.;
    </li>
    <li>
    return any disputable amounts to their actual owner or deduct the same to Our benefit;
    </li>
    <li>
    block Your Account;
 
    </li>
    <li>
    close Your Account; 
    </li>
    <li>
    impose other sanctions as might be provided for by the T&C or applicable laws.

    </li>
</ul>

<p style={{ marginTop: "10px" }}>
12.2. Any of the above measures may be applied by Us at Our sole discretion separately or together with any and all other measures referred to above or any other measures envisaged by these T&C and/or applicable laws.
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
13.        Closing of the Account
</p>

<p style={{ marginTop: "10px" }}>
13.1. Your Account may be closed upon Your own request. If You wish to close the Account, You have to contact the Customer Support with respective request. 
</p>

<p style={{ marginTop: "10px" }}>
13.2. We reserve the right to close Your Account at Our absolute discretion and without any obligation to state a reason or give prior notice.
</p>
<p style={{ marginTop: "10px" }}>
13.3. Upon closure of the Account You will be able to withdraw funds remaining on the Account balance, if any, in accordance with Our standard rules and procedures for the withdrawals, subject to deduction of relevant withdrawal charges, compensations and outstanding amounts, if any. 
</p>

<p style={{ marginTop: "10px" }}>
13.4. When Your Account is closed by Us due to Your breach of the T&C, You will not be allowed to create any further Account and use the Website.
</p>


<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
14.      Taxation
</p>

<p style={{ marginTop: "10px" }}>
14.1. By creating the Account, You acknowledge and agree that Your use of the Website, including receipt of Wins as result of participation in Games (and other payments) and placing Bets, may be subject to taxation according to laws of the state of Your nationality, residency, domiciliation, the territory from which You access the Website, or other applicable laws and regulations as a case may be. 
</p>

<p style={{ marginTop: "10px" }}>
14.2. You agree to comply in full with all applicable tax laws and regulations, and be solely responsible for all taxes and tax reporting to any relevant government, tax or other authority on any Wins (and other monies) paid to You in connection with the use of the Website, subject to applicable local, state and/or federal tax laws and regulations.
  
</p>

<p style={{ marginTop: "10px" }}>
14.3. If according to applicable laws or regulations We are obligated to report, withhold and/or pay any taxes on Your behalf, You agree to fully cooperate and support Us in doing so, and unconditionally agree promptly and efficiently to complete and sign all forms and reports, as well as to provide Us with all information and documents and as might be needed for that purpose. You further agree that We will be authorized to withhold and pay on Your behalf any and all taxes as might be required by applicable laws, and for that purpose We will have a right to deduct the relevant amount from Your Account and/or the withdrawal and/or Win amounts as might be applicable.  
</p>

<p style={{ marginTop: "10px" }}>
14.4. You further agree to release Us from any and all liability and losses associated with compliance with Your tax obligations arising out of or in connection with the use of the Website, including, but not limited to receipt of any Wins, making any deposits and/or withdrawals. 
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
15.        Responsible Gaming

</p>
<p style={{ marginTop: "10px" }}>
15.1. You acknowledge that gambling through the Website should always be aimed at entertainment and shall never be considered as a source of income, means of recovery from debts or alternative to employment.  
</p>

<p style={{ marginTop: "10px" }}>
15.2. In order to assist You to gamble responsibly, We, at Your request, will apply personal limits and restrictions for Your use of the Website, or exclude You from being able to use the Website. The relevant request may be submitted to the Customer Support.   
</p>

<p style={{ marginTop: "10px" }}>
15.3. When You wish to limit or restrict Your use of the Website, You shall notify Us on the same in written specifying the type of applicable limit(s), preferable duration of such limit(s) and limit(s) specifications (e.g. maximum allowed amount of losses and the period for which such amount will be considered). 
</p>

<p style={{ marginTop: "10px" }}>
15.4. Upon Your request We will within the commercially practicable term effect the following personal limits (those of the listed below which You have requested for) for Your use of the Website, according to Your respective request.  
</p>

<p style={{ marginTop: "10px" }}>
15.5. You may at any time request Us to apply more strict limits (in which case such limits shall be effected in general order as provided above), or ask Us to relax or cancel the limits and restrictions effected earlier. In the latter case, We will consider such relaxation or cancelation on a case-by-case basis and may, at Out sole discretion, either approve or decline such decrease or cancelation.
</p>

<p style={{ marginTop: "10px" }}>
15.6. After the expiry of the applicable limitation period, You will be able to use the Website without any requested by You personal limits and restrictions described, subject to general provisions of these T&C.
</p>
<p style={{ marginTop: "10px" }}>
15.7. By using the Website, You accept Our Responsible Gaming Policy and agree to fulfil obligations imposed on You by the said policy.  
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
16.      Privacy Policy 
</p>
<p style={{ marginTop: "10px" }}>
16.1. We process some of Your personal data. To understand which personal data We process and how We use Your personal data, You can read Our Privacy Policy available on the Website. This Privacy Policy will inform about Your personal data, the purpose of its collecting and privacy rights. Although Our goal is to always be as clear and transparent as possible, We appreciate that legal documents can sometimes be difficult to read. Please do not hold back from contacting Us for any clarification You may need. Thus, please read carefully Our Privacy Policy available at the Website and make sure that You fully understand it prior to the registration of Your Account. You should be aware that Our Privacy Policy is included herein by reference.  
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
17.       Errors and omissions

</p>
<p style={{ marginTop: "10px" }}>
17.1. We undertake to do Our best to prevent and to cure any technical or human errors, malfunctions, breakdowns, mistakes, network interruptions, bugs, viruses or other technical issues, which may influence Your ability to use the Website, play any Game and/or receive any funds in connection therewith (the “Technical Issues”).  
</p>

<p style={{ marginTop: "10px" }}>
17.2. You acknowledge and confirm, that We cannot, however, prevent all Technical Issues. If You face any thereof while using the Website, become aware that Your Account has been mistakenly credited or decreased etc., You shall immediately stop using any services of the Website and inform Us through Our Customer Support respectively.
</p>
<p style={{ marginTop: "10px" }}>
17.3. We reserve the right to cancel, recognize void, and/or make any relevant recalculations and adjustments to, any transactions, Bets, results of the Games, Wins, withdrawals and/or other allocations made or to be made as a result of or in connection with any Technical Issue.  
</p>

<p style={{ marginTop: "10px" }}>
17.4. We have the right to deduct any amount mistakenly credited on Your account, as well as any Wins and other benefits obtained by You as a result of using such mistakenly credited amount (hereinafter mutually referred to the “Disputed Amount”), or, if stipulated by applicable laws, to transfer the Disputed Amount to its actual owner, the Authority or other state or governmental body or authority as a case may be. For this purpose, the Disputed Amount will be debited from Your Account. 
</p>

<p style={{ marginTop: "10px" }}>
17.5. If, before We become aware of the mistake, You withdraw funds that do not belong to You, without prejudice to other remedies and actions that may be available under the T&C, applicable laws or otherwise, the Disputed Amount will constitute a debt owed by You to Us. 
</p>
<p style={{ marginTop: "10px" }}>
17.6. If You suffer any losses as a result of any Technical Issue on Our side (i.e. if Your Account balance was mistakenly decreased as a result of, or in connection with, the relevant Technical Issue), You have a right to request for the recovery of Your losses, subject to compliance with the terms of the T&C set forth below. Requests for the recovery referred to above should be submitted by You to the Customer Support according to this T&C. Any request for recovery sent after expiration of the terms stipulated under the T&C may be considered by Us, however, We reserve the right to decline any such late request without giving any explanation to You. For the avoidance of doubt, You will be deemed to discover (be aware of) the occurrence of the decrease in You Account balance, once You log in Your Account after the respective decrease of the balance.

</p>
<p style={{ marginTop: "10px" }}>
17.7. Please note that We will consider and make any recovery to You exclusively subject to the strict compliance with the T&C and applicable laws, and unless otherwise expressly established hereby, We do not guarantee any recovery, reimbursements, returns and/or refunds and in no case will provide money refunds as a result of or in connection with Your using the Website (including depositing any funds, making any withdrawals or playing any Games), including those which may occur as a result of, or in connection with, any Technical Issue being not on Our side.
</p>
<p style={{ marginTop: "10px" }}>
17.8. For the avoidance of any doubts, any Technical Issues originating from Your side or any third party side, including but not limited on the side of network or hosting services providers, payment service providers, Game providers etc., technical issues arising out of, or in connection with, any of computer viruses or other malicious code elements, dangerous or destructive files, which can spread or in any other way affect the software and hardware while You are using the Website, participating in the Games or accessing any information or downloading any kind of data etc., shall not be regarded as a Technical Issue on Our side, and We will not be obliged to reimburse You any losses or expenses You may suffer as a result of or in connection with their occurrence. In the event of software or random number generator malfunctioning, the participation in Game will be considered null and void and the amount of respective Bet will be returned to You after the investigation.
</p>
<p style={{ marginTop: "10px" }}>
17.9. The right to define if the loss results of a Technical Issue is on Our side, the type of the Technical Issue, the amount of the loss, any measures which should be taken to cure the Technical Issue and/or any consequences thereof is vested solely on Us, unless otherwise is stipulated by applicable laws.  
</p>
<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
18.      Limitation of Liability
</p>

<p style={{ marginTop: "10px" }}>
18.1. You acknowledge that You enter and use the Website and participate in the Games at Your own risk. The Website and the Games are provided without any warranty whatsoever, whether express or implied.  
</p>
<p style={{ marginTop: "10px" }}>
18.2. Without prejudice to the generality of the preceding provision, We, Our directors, employees, partners, service providers:
</p>

<ul>
    <li>
    do not warrant that the software, the Website or the Games is/are fit for their purpose;

    </li>
    <li>
    do not warrant that the software, the Website or the Games are free from errors;   
    </li>
    <li>
    do not warrant that the Websites and/or Games will be accessible without interruptions;
    </li>
    <li>
    shall not be liable for any loss, costs, expenses or damages, whether direct, indirect, special, consequential, incidental or otherwise, arising in relation to Your use of the Websites or Your participation in the Games;
    </li>
    <li>
    shall not be liable for any loss or damage that You may suffer because of Our failure to perform any Our obligations set forth herein as a result of force major, which shall include any event being outside Our control, including but not limited to any act of God, power failure, trade or labor dispute, pandemic, act, failure or omission of any governmental authority or government, change of laws or regulation, obstruction of any telecommunication services or networks, or any other act, omission, delay or failure caused by a third party.

    </li>
</ul>
<p style={{ marginTop: "10px" }}>
18.3. Indemnification. You hereby agree to defend, hold harmless and indemnify Us and Our affiliates from and against any loss, damage, cost, claim, proceeding, penalty, fine or expense, including legal fees, incurred by or suffered by Us and Our affiliates, which arises out of, or relates to, directly or indirectly: (i) Your use of the Website and the Games; (ii) Your failure to fully and timely perform any of Your obligations hereunder; (iii) any of Your representations or warranties made hereunder being, at any time, untrue or incorrect; (iv) use of the Website, Games and the Account by You or any person who is using Your Account whether with Your knowledge, approval and authorization or without it; (v) any violation by You of any law, rule, regulation, or the rights of any third party.
</p>

<p style={{ marginTop: "10px" }}>
18.4. Our maximum liability to You arising out of the T&C in relation to one (1) or more incidents, whether for breach of contract, tort (including negligence), or otherwise will be limited to:
</p>
<ul>
    <li>
    the amount of the Bet to which the liability in question has arisen; and 
    </li>
    <li>
    the amount of a deposit in question, in case of Our mistaken misplacing such deposit amount.
    </li>
</ul>

<p style={{ marginTop: "10px" }}>
18.5.    Nothing in this clause shall limit Our obligation to pay You Wins or other sums properly owning to You, subject always to the T&C and maximum Wins limits. 
</p>

<p style={{ marginTop: "10px" }}>
18.6.    Nothing in the T&C shall exclude Our liability that cannot be excluded by applicable laws.  
</p>
<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
19.      Disclaimer of Warranties
</p>
<p style={{ marginTop: "10px" }}>
19.1. You expressly agree that the Website and the Games are provided "as is", "with all faults" and "as available", without warranty of any kind. We disclaim all warranties, express, implied, statutory, or otherwise, including, but not limited to, implied warranties of fitness for a particular purpose, merchantability, title, quality, and non-infringement.
</p>
<p style={{ marginTop: "10px" }}>
19.2. We do not guarantee that the Website and any Games will be available at all times, in all countries and/or all geographic locations, or at any given time, or that We will continue to offer Our services for any particular length of time. 
</p>
<p style={{ marginTop: "10px" }}>
19.3. All tools and measures for responsible gaming practiced by Us are designed exclusively to protect You and no claims may be submitted to Us as a result of or in connection with their application.
</p>
<p style={{ marginTop: "10px" }}>
19.4. Security and Viruses. Any use of the Internet may be subject to a virus attack and/or communication failure. We shall not bear any liability, whatsoever, for any damage or interruptions caused by computer viruses, spyware, Trojan horses, worms or other malware that may affect Your systems, computer or other equipment, or any phishing, spoofing or other virus attacks. We recommend that You use a reputable and available virus screening and prevention software at all times. You should also apply caution when reviewing text messages and emails purporting to originate from Us, as SMS and emails are also vulnerable to phishing and spoofing and additional viruses. It is advisable that You log into the Account through the Website only and avoid using unauthenticated communication advising You options to log in.
</p>
<p style={{ marginTop: "10px" }}>
19.5. Website Accuracy. Although We intend to provide accurate and timely information on the Website, the latter (including, without limitation, its content) may not always be entirely accurate, complete or current and may also include technical inaccuracies or typographical mistakes, including but not limited to in spelling of players' surnames, team names, cities names of the events covered by any Game etc. In an effort to continue to provide You with as complete and accurate information as possible, information may, to the extent permitted by applicable law, be changed or updated from time to time without notice, including without limitation information regarding Our policies, products, services and the Games. Accordingly, You should verify all information before relying on it, and all decisions based on information contained on the Website are Your sole responsibility and We shall have no liability for such decisions. In addition, if any mistake is inadvertently done in pay tables, We reserve the right to modify the payout ratios even once the event has finished (when applicable). 
</p>

<p style={{ marginTop: "10px" }}>
19.6. We make no representations whatsoever about any external or third-party website You may access through the Website. Occasionally, the Website may provide references or links to other websites ("External Websites"). We do not control these External Websites or third-party websites or any of the content contained therein. You agree that We are in no way responsible or liable for the External Websites referenced or linked from the Website, including, but not limited to, website content, policies, failures, promotions, products, opinions, advices, statements, prices, activities and advertisements, services or actions and/or any damages, losses, failures or problems caused by, related to, or arising from those websites. You shall bear all risks associated with the use of such external content and External Websites. External Websites have separate and independent terms of use and related policies. We request that You review the policies, rules, terms and regulations of each External Website that You visit. It is up to You to take precautions to ensure that whatever You select for Your use is free of items such as viruses, worms, Trojan horses and other items of a destructive nature.
</p>
<p style={{ marginTop: "10px" }}>
19.7. We are not responsible for any damage to Your mobile, tablet, laptop, or desktop device, computer system, other hardware or software, or for any loss of or damage to data that may result from use of the Website or the Games by You. 
</p>
<p style={{ marginTop: "10px" }}>
19.8. We will do Our best to ensure basic protection of the funds held on Your Account. For this purpose, We will implement the relevant internal policies and procedures of accounting and funds management. We shall not be obliged, however, to refund any amounts lost by You as a result of playing the Games. We shall not be responsible for any fluctuations, both down and up, of currency exchange including cryptocurrency over short periods of time on a regular basis. Such fluctuations are due to market forces and represent changes in the balance of supply and demand. We shall not be liable for any losses or any special, incidental, or consequential damages arising from, or in any way connected to such fluctuations.
</p>
<p style={{ marginTop: "10px" }}>
19.9. Should We at any time become insolvent and be dissolved, Our assets and liabilities to You will be managed in accordance with applicable laws as referred to in the T&C. Creditors are paid in accordance with the statutory priority order.
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
20.        Intellectual Property
</p>

<p style={{ marginTop: "10px" }}>
20.1. As between You and Us, We shall be the sole owner of PlayZeed brand (in its widest sense) including all related trademarks, logos, designs, trade dress copyrights and other assets that may be available at Website or otherwise. Any unauthorized use of the mentioned assets may result in a prosecution.   
</p>
<p style={{ marginTop: "10px" }}>
20.2. As between You and Us, We are the owner of the rights to the technology, software and business systems used on the Website. Such technology, software, the contents and structure of the Website are subject to copyright and database right in the name of Us. All rights reserved. The copyright in the Website, including all text, graphics, code, files and links belongs to Us and the site may not be reproduced, transmitted or stored in whole or in part without Our written consent.   
</p>
<p style={{ marginTop: "10px" }}>
20.3. You may only use accessible part of the software (client interface) of the Website within the scope limited to the Permitted Purpose in accordance with all rules, terms and conditions as set out in the T&C and in accordance with all applicable laws, rules and regulations.
</p>
<p style={{ marginTop: "10px" }}>
20.4. Links to the Website and any of the pages and sections therein may not be included in any other website without Our prior written consent.
</p>
<p style={{ marginTop: "10px" }}>
20.5. You agree not to use any automatic or manual device to monitor any Our webpages or any content therein. Any unauthorized use or reproduction may be prosecuted.
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
21.        Customer Support, Complaints
</p>
<p style={{ marginTop: "10px" }}>
21.1. If You have any request and/or complaint to Us, You should email Our customer support team (the “Customer Support”) via info@playzeet.com and We will reply to You as soon as practicably possible, unless there are external factors causing delays. Your complaint shall be revised by Us only if submitted within:
</p>

<ul>
    <li>
    seven (7) calendar days following a disputed event if related to the result of a specific Game; or

    </li>
    <li>
    one (1) month following a disputed event not related to the result of a specific Game, but related to Your Account (e.g. withdrawals, suspension/closure of the Account, calculation of bonuses etc.).
    </li>
</ul>
<p style={{ marginTop: "10px" }}>
You shall bring any information forward to assist Us in this process as soon as possible, as this would be in the interest of all parties involved. We will use Our reasonable efforts to resolve a reported matter promptly.
</p>

<p style={{ marginTop: "10px" }}>
21.2. For Your protection and to ensure the best possible service to You by Us, telephone conversations and other relevant communication between You and Us may be recorded and/or monitored. 
</p>

<p style={{ marginTop: "10px" }}>
21.3. We will not tolerate abuse of Your right to file complaints (e.g. spam or multiple groundless complaints, offence of Our personnel or other abusive in Our sole opinion behavior), We reserve the right to restrict Your ability to file complaints, as well as ignore all received complaints from You. Furthermore, should You behave in any such manner towards Us or Our employees, We reserve the right to suspend and/or close Your Account and stop all communication and/or replies from Us, and/or take any further measures as may be deemed appropriate, including reporting to relevant authorities and law enforcement agencies. 
</p>

<p style={{ marginTop: "10px" }}>
21.4. In the event of any dispute, You agree that the server logs and records shall constitute a trustful evidence for the purpose of determining the decision regarding any claim. You agree that, in the event of a contradiction between the result of the Game that appears on Your screen and actually recorded by Our servers, the result that was logged on the servers shall prevail, and You acknowledge and agree that Our records will be trustful evidence for the purpose of determining the terms and circumstances of Your participation in the relevant Gaming and the results of this participation.  
</p>
<p style={{ marginTop: "10px" }}>
21.5. Any communication to You by Us shall be deemed proper if performed using Your contact details specified in Your Account and all such communication shall be deemed delivered at the moment of sending. 
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
    22.        Waiver
</p>
<p>
22.1. Our failure to exercise any of Our rights or remedies to which We are entitled pursuant to the T&C or by virtue of law, shall not constitute a waiver of such rights or remedies and shall not relieve You from entire and proper compliance with such obligations. A waiver by Us of any default shall not constitute a waiver of a subsequent default. No waiver by Us shall be effective, unless provided in writing, excluding email.
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
23.        Severability 
</p>
<p style={{ marginTop: "10px" }}>
23.1. If any part of the T&C is held to be invalid by law it shall be deemed automatically and immediately amended to the extent enough to bring it in compliance with relevant laws with a minimum substance change.  
</p>
<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
24.        Relationship and Third-Party Rights 
</p>
<p style={{ marginTop: "10px" }}>
24.1. Nothing in the T&C shall create or be deemed to create a partnership, joint venture or principal-agent relationship between You and Us.
</p>
<p style={{ marginTop: "10px" }}>
24.2. Unless expressly stated, nothing in the T&C shall create or confer any rights or any other benefits either pursuant to the statute or otherwise in favor of any person other the You and Us respectively.
  
</p>
<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
25.        Applicable Law and Jurisdiction
</p>
<p style={{ marginTop: "10px" }}>
25.1. The T&C any dispute, controversy or claim arising out of or in connection with the T&C, including breach, termination, interpretation or invalidity hereof shall be governed by Nigerian Law and shall be submitted to the exclusive jurisdiction of Nigerian courts.
</p>
<p style={{ marginTop: "10px" }}>
25.2. You acknowledge that, unless stated otherwise, the Games are organized from Nigeria. Any contractual relationships between You and Us shall be deemed to have been entered into and performed by in Nigeria, at Our registered address.
</p>
<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
26.        Entire Agreement 
</p>
<p style={{ marginTop: "10px" }}>
26.1. The T&C constitutes the entire agreement between You and Us with respect to the Website, save for the case of fraud, it supersedes all prior or contemporaneous communications and proposals, whether electronic, oral or written, between You and Us with respect to the Website.
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
27.        Assignment 
</p>
<p style={{ marginTop: "10px" }}>
27.1. The Company reserves the right to assign or otherwise lawfully transfer any rights and/or obligations under the T&C to any its affiliate or third party. By accepting the T&C You irrevocably consent for such future assignment and/or transfer, including for the transfer in the course of such assignment of Your personal data and other information, Account balances etc.
 
</p>

<p style={{ marginTop: "10px" }}>
27.2. You will not have the right to assign or otherwise transfer Your rights and obligations under the T&C without Our prior written consent, and any purported assignment in contravention of this clause shall be null and void. 
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
28.        Amendments
  
</p>
<p style={{ marginTop: "10px" }}>
28.1. We reserve the right to amend and modify the T&C at any time. Such modification shall take effect immediately upon the new version of the T&C is published on the Website. Each time You visit the Website You shall check the last date of modification of the T&C and read the updated version of the T&C carefully in their entirety before You start using the Website, including any of the Games and/or Your Account otherwise.
</p>
<p style={{ marginTop: "10px" }}>
28.2. By continued use of the Website, including upon modification of the T&C, You confirm that You agree with the then-current version of the T&C and commit Yourself to abide by it at all times when using the Website, including participation in Games and/or using Your Account otherwise. If You do not agree to be bound by the updated version of the T&C You shall cease using the Website immediately, withdraw all available funds on the Account balance and ask the Customer Support to close Your Account.
</p>

<p style={{ ...FONTS.h6, textAlign: "left", marginTop: "20px" }}>
29.        English Language Controls 
</p>
<p style={{ marginTop: "10px" }}>
29.1. The T&C are made in English, but may also be published in a number of languages for information purposes. In case of any discrepancy between a non-English version and the English version of the T&C, the English version shall prevail.
</p>































      </div>
    </div>
  );
};

export default TermsAndConditions;
