(function() {
    "use strict";
    var const_undef = void 0;
    var rgbNormalize = function(rgb) {
        return [ rgb[0] / 255, rgb[1] / 255, rgb[2] / 255 ];
    };
    var hsbNormalize = function(hsb) {
        return [ hsb[0] / 360, hsb[1] / 100, hsb[2] / 100 ];
    };
    var rgbToHex = function(rgb) {
        return "#" + ((rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16);
    };
    function hsbToRgb(hsb) {
        var _a = hsbNormalize(hsb), h = _a[0], s = _a[1], b = _a[2];
        var r, g, _b;
        if (0 === s) {
            r = g = _b = b;
        } else {
            var i = Math.floor(6 * h);
            var f = 6 * h - i;
            var p = b * (1 - s);
            var q = b * (1 - s * f);
            var t = b * (1 - s * (1 - f));
            switch (i % 6) {
              case 0:
                r = b, g = t, _b = p;
                break;

              case 1:
                r = q, g = b, _b = p;
                break;

              case 2:
                r = p, g = b, _b = t;
                break;

              case 3:
                r = p, g = q, _b = b;
                break;

              case 4:
                r = t, g = p, _b = b;
                break;

              case 5:
                r = b, g = p, _b = q;
            }
        }
        return [ Math.round(255 * r), Math.round(255 * g), Math.round(255 * _b) ];
    }
    var src_hsbToRgb = hsbToRgb;
    function mouseMoveEnviron(element, callback) {
        var leftClickStatus = false;
        element.addEventListener("mousedown", function() {
            leftClickStatus = true;
        });
        element.addEventListener("mousemove", function(e) {
            leftClickStatus && callback(e);
        });
        element.addEventListener("mouseup", function() {
            leftClickStatus = false;
        });
        element.addEventListener("mouseout", function() {
            leftClickStatus = false;
        });
    }
    var event_mouseMoveEnviron = mouseMoveEnviron;
    function mouseMoveElement(element, callback) {
        event_mouseMoveEnviron(element, function(e) {
            element.location.x += e.clientX - element.size[0] / 2;
            element.location.y += e.clientY - element.size[1] / 2;
            callback();
        });
    }
    var event_mouseMoveElement = mouseMoveElement;
    var __spreadArray = function(to, from, pack) {
        if (pack || 2 === arguments.length) {
            for (var ar, i = 0, l = from.length; i < l; i++) {
                if (ar || !(i in from)) {
                    ar || (ar = Array.prototype.slice.call(from, 0, i));
                    ar[i] = from[i];
                }
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };
    $.global["#ColorPicker"] = function(config) {
        $.gc();
        var ColorPicker = {
            name: "ZD Color Picker",
            author: "赵大牛",
            verison: "0.0.1",
            units: [ "H", "S", "B", "R", "G", "B" ],
            dataFontSize: 16,
            ok: {
                en: "Ok",
                zh: "接受"
            },
            picker: {
                rgbSize: 20,
                hueSize: 10,
                strokeWidth: 2
            },
            srcImage: "PNG\r\n\n\0\0\0\rIHDR\0\0\0ÿ\0\0\0ÿ\b\0\0\0>\b\0Ê\0\0\0\tpHYs\0\0\0\0\0\0\0O%ÄÖ\0\0\0$zTXtCreator\0\0\bsLÉOJUpL+I-RpMKKM.)\0AzÎjzÅ\0\0 \0IDATxík¯ÛÆ®`ÿÿß¸¿Z$M&Îãq)ÝXXÒ\fùrlë!GòJûá8þýù÷çßØÏþýílþé×À×Ñ´|å8?Çë|ÇAß¿§ã8è¯¿þ¢¿þú¾}ûFþù'ýöÛoôÓO?Ñ¿ðÿ{ñ¯~ýù\vZÐ8ÏGóàç^ë·÷óýû÷ÓÏýÛ·oôõëWúòå\výþûïôñãGúùçé¿ÿýïÿP_þ¼ø3/þ¬u4³±\rx/>0;ÿ Í£óc\vt\vxýêô\vüO>Ñ¯¿þJ?ýôÓÛÀúå]6ø¾}]¶å&\n.~X¤køú#ílG¶Æ+Ú8>PÀéqý[Ð/Ðèe·_àÿñÇôùógúôéýòË/ôÓO?ÑÏ?ÿ|+üä/ººUÊ9òú£Ú¥¦ó:~àÎ}0ÆÍ±àaW¶î±CXQXóã¿þúËmõW×ÿüù3}üø~ùåúõ×_éãÇ[á°¿ràõU@¾N¿¼ÖÊn*ó_¨ lèØæk±@&å¶ÙªË±Ì^ñîÎÎ=}àÐËmþú½À_]ÁÿÛo¿ÑÇéÓ§OôéÓ'úý÷ßÇáÿ }»Íy\r\b,á:7¾GY;²±ÙâèÛp»ÍÇP§»·6Ù¢[>|MÞ6~ýÖÀçÚ²µÿþýû±'¢¼ãKðåÁÿùógúüù3ýþûïôåËøo^Y¯8Þþ¶Í VÀ¿»8\0o*ñKí\b`WXNnßù.ÿAÎu¡×àÛücOBðõë×Ó½¾ýüñÇôåËúúõkþéV4m&]z`U\v^¶1©m;R<=\rV/ÆÊíÞÎ¹Ù¹Ùñå6\0Þíêìøàã¼  ð'Á÷ø}[~ÿ~ýüùçôíÛ·2ü«ÚÀÎWíFÛ¡Ñb¬~xçå@\n1æ³ÕÎÁ®~(c§<Eð­.XÅ Óí£{l»|ýúè_þ,ð«ðw{ç¢Ý/Õ9|ÑöÛí®«-ü`ÙªðVAÓ\n|-ÙnÎý0Æ/Ûy~l@oýzz<¼«ÏáçÛý¯_¿DôaÁ/ÖÎ`Åfá_¹@vÂÃÒtbªúÈÙo{T,Õ\tk÷èðDNaE³ÐÝ/Ð²ã°[¿Ù±Ôw¿÷~nÿ,ô(Õ®¯<è»\0>¿b¾ÿ\f|ýð°[[N|_ÛëÙuÅ\"\v´5§]¤ÌRS±lWçÊÙÍµ1­ðî­ùÊ¯í\føùw÷Ç÷ïßDàÐ[~³\0ð1þÒLuþ.ûè­»q®ìXõÀzW,­é¤Àïnß30Ë±àØÈùúMqÿêö^-\bô~v~¬¯ñÐ-¿Öù×\n?\v«ëBÝ\"dº0[jE×üÖ!Ò\n4Ü%'¥®Ã)\0ÑöÝ\\ÇÆ.(>Ïâbeî1÷\v\nÀ©XÇ-øÙï<wÈ_vöuß³ûsèù\t!ðw·û¥o\fH*À«;ä%9Ýê¾<¿ftov4¿ª¡ÅÀósïµ¨Póc¾e^½×Æxgç××Ùc¨È±Ý¿ÜÓs«\b¿Þ;í<øµðíÛ7úòåËA\"\"»þqXço°.\nôÙ-3=ÅKþ,9ÊËyhÄâ½|Ñëà¾|Z§µâÂpÙ¶óãsØµÃ+à_~ÿ]\vNsðå¬`^\b\0ðe·_ù?XÐ÷úO=øå¶~ÚõwÃ\0zs,C^ÀèîB®Ë;sÓ\nZ²pkÚ|Í\n¼î×p<iTvx9/\nÁãG-üâ÷åÁÞãP÷ú ÏçÖ9]ÀGá¯nù+àW oÿðCó¥o4ð¢´VV ¬â §ù,HX¸(xq<&*\n\vL-Î+<Bàü\v^lóÕ§ûøëxý%ÜÂËb ®­?×^ë\f;}üèn)cn!´4âÌÍ-Za05cìø0ÆÍKT?ujÇñ\\èVÿ`sp!à[{\0þË=äë=¹ð?Dt)2;à¯ú+0¢ÐÃÀ/\v\\#¼pu¹1?R´ÂÀµô-À¥¿«|-(Üc¹!êò\t0\nó]þh\0þg Ñ¯ø úY9èÒõ#ø³[þ?ô\r\0½ðSýeq¸RðRmûîå\bpµ0dBä¯Áª­ÈÜ, ØÏ0­h`K\t²òsh¾Ú÷øã§?òO~ÇïtþË-ý:þã?)?Óõ³à£Ý>}fÞó{Ú\tàÃuHp5_^«0Br¾eÌ»ÈvûCúZ@h«Û}é(îwùÊïK\bò?¡Öà÷J-ùdRÿ)å?¦×!/¾ÀÜ÷©íirV5 ¾æW¦µ«Û\\ÓÀr]1ç°RÓ+ZÑ0\0ÔáÙØÉ×)\0§­=ðßíêÚC@Y(´âBtf:ÿøü¡üÐ£]ÛÝ9Äóuý¡¢ÀáÕÖEïä\0éøn1óÜ\nÐÏÜì<ìð·ÅWÀúYOùåV}uõè\0þU^´³Xï\t²íG·ñh×Ïoú\vÖnù°)SÖü/eõ¬\"}Q?±65±Ô\nY?eÌ,^A0ù^¸ç§ød\nÁÉOî\0ì9@{Àgýø}Ùh»~ÿoÇó+?þ~còéö«À=æÐÎmJdm]I?ÓçZÔ®¬~³ÝðQ;¹×üBË¯MúhÀóSÜÜO{ØxÐw*\0Îù¨~ÒèúU¶>ùtàGº>ä#/teèW|§ÞË§¸ßð>Ò/XóJ?u }Égù\bÍ¢|ùñ×¦ÀýãPòyéGàVPºý©÷úæ_ó1Íïù­{ÖNßûkùÖ±¼>Z\b|¤Û{ .\"U8r¯ïÞLùõºE#\tºY4´|PM'û(ó®W\b?ÕÇ+ÆVÿéÝçOúOpkÛ÷èÕýåkïY~è^¿£º\r° ·&µâ«ø¬\vÕÊèDyZ¡Z\f8|rä\r`-NeN\\þ|Oóüj0\nAX\0,¸µ­½ü\noåáÝ_®ÃÏßÓrço2øâ\" 7ÖAy g­#ÚögæOy\fá-[\bU\r^,d¡°\n)\0s\rr«\b0pN[EÏ+[onóÓ'Óýµm½µõô®62¯Åuûè\0íâQ|\b¬#Ó½+Ý=zÈÅsyMßðQçÐ£n¯Æ#{ó¢sºûø}*Ê}¾ûz\0ÚtÇó?ài¼¾çàc½Wjç÷ÙÇ|¼ùJa`¼èB¯h«ñZQÒr;E%=ï\f¤XÚÙùÔöß×â-ÐY¼õU^rkÞºßsÖ}¾¹\rX¯#Úþ[;\x009¯¼¿O+Á_ït{\rg¬L¬AoèÐJy±æpO*sÚÚ¼bg>ÛõO XSë[E@Æjó5e gñÖ=ôe mó½êþ²8÷èôÃ¯ã0ø5àöâKà¯ymÒ*\npµ¼ZA1 ×ò¢Ûþ°k¯%´\\S¡`×æ2 [sÚ¼Ù+ä¼\0\0÷ú.Ä^°\0vÇq<üIèe íüU¸£9ußÝ\tX99$¦µ$j6¦B-Ee!AæB!Ã/ÀÊØ\tØ×rMÈ¸hNW\r8 E­¾¿\n1;îóOB\0})k¾Ûý×ïémi®R$ LÇ»áõ4%ØÙb!5\r½òU(\0Øe8t¿0ÎÜÚX4ÐÞéÁ§l÷/s¼\0h·Zók}äDöw÷<N¬S¾§niø+ æ\"ð[;\t\r)Éèµ8JÀ«¬O÷2gÀiBÍeby¸-ÆM0Wí)¿^\vft¦i}µîdìäbNÕsRou>&\v_Îeàï÷-½¹À\0V×ÀÁqQÇáUÖÏ±<§)+FWH¢Û|¸\0ãáQ<Ø!Ðµ9ð­qç~ßvé%·ùêä_Î)ï\r~ß¯ñ4Ñù=ÀÇcPY¼ußo¬\rÊ\"Åd\vR$Ô9$&Wà­tw7&¾-&S¢\rô5'Aç1²H¼\0p-\rfí|­SÂéäÞÃ=ÃMOmû3Oî¬?Hº°¹.#)1{v\v`¹Þ°û[1P>.ÃRÝØ´gË¥¦%cñ\\ûc«´¼®­ÝhÝç^1¼\0ð9«û÷(×I~k¼<;.H0ÄrÑQü!-{A\"uq©íîþ¥@ÈÜ$@dSn÷fãa9´qù\0Ï÷õ.èÚè>ßzXçí2ãÚð®ès][Æ­¼Ú¸d¯¥7ÒÖiÉâa ¹\b2éóõHHd\\êH}×ò7ÆO Ô¸õPûk\0yØ'ÇµÛ\tïÁº-ày­­?ç¶þHéü:ûþ\\s|¬ $À»7ÓÎú9ÙE¯Ëqõö@@eÇâ{¯ï4.:Þ¸§!A·ÆåC<oÜyÌÎ@hÝÚ½fë¯Í-Ûå^_ê´Á',ÓrwJ¾Ó \nlÑ÷Sh¸P*ãp'ý'ùæ¸2Áþô Î÷û w\f|ÜÚ]·ùV±ÝkÈ1>nYþ1-\rÐ×ö4Æ.0dmLí©!K÷,\rk\\÷,yW}%¬ëXÂ§ùÊqbæ×t1\vöPÃòãDØ/¾Öv_émõµz¤^÷G5ã|K MÆrá·ÆÅÜ®Ðr»\0¯SOûF_ÓX7}5]>Æ.ª.ð;6\v\t\x002i`ñ:J°sßL·×Æ{}ë©}¦£K_ö^|I¿uÀomµ-9nm³]ß`ÌZ×Ä.@ËÈøs+`hñJË¸3Á­Yñ<w}ézñjã¬.Àr,òE¾âã`ÅKP_ªûóëhý¬~ìZ:ù¶;f\\\\¼&äxWÚD<_ôÂ×-¦¯Á)b!1·8©`ZãÑ½¾6¦B,5°µ±¦v_¾ äñZaÐ4­}J[*\n1iÖx~´CgÖÆÒyä¶n9¶.2É­Ã¼ÜtÚº%4Þ[Y¹58×';&.nB>&ã%ØÒÏêö(Þwþ2yj¯Ýh[Þå¥æ2y¾¥ócîv[Ób1±\vÈ6Ì\"o\vp+ÖÓôX>v~è¾Óô<`ùúøX¶c{chQà±²\0h~Ú¾²ÍÆ¸És¢&üß4øè\0ÎáÅR¢X~Vì¦±pûùI½ì¦ÇóFctç2¦V;«WeïÿjkL[óSðïØòóóv1ºr¬ü »K_ÒÊ1-hÌÒÒÖÆÁ~­­?»!±ã]óúF'6·S`ïËÚhL~ÇÇ¸ï2yÎÇ¹Að1÷ë<g¬ÓáSZüµÆs\"\fèhñµ1ï~>,»à.úr]l ´õG|4hµ±uîÝ(ÚÝºß±ÞÃ>´Ók÷ùËäÿ­\tÃí8â¯úÒ_ó±\vÄØ#|+äSa¯§³¥ãD>\rLÄçÆ¼­ýÁ.5ÔbÔw}¸²ÌÇä È1ë!ß:wÂ%Îvvjqv­µ¯ûU:¿KÎ/z/bùçÏ1W**V÷n*©íÑß\râsYbÅkq\v$î£Åq¸x.@Oû8ì,Ç*÷üw)\b\bìV§ÇQÜ2-^ÎÍÀUAw}jqx^!cç¤Äb¸«èsNY3îÝ¸[(´sklÁÄsY>üüFí«»\vÜ2½ë£÷Ñüä<Q~ä~?\rºrúHýjç¯éµ¢KÐP!ºO~®ù0la8m¿](Vaçj¡Ðr\vè.ÅDPÆ|À-øÅÑaïA97?gëI)\bòû~Ï¶w~Â:z1âãæa«>ò\\\0½·1ÜÇÝiHÐ¼<®ªÄtsc,\\º\nþßºuXï]'&7±|´sMW³.üÈÃ8ixè|Ak±QLúþË×âè\"dÅyPÈ31¯ê¬Ìößq»¾c\v0&úº®ª}SPÙÚ£ßñóKå'ç¸iãc_^ØC:øt\nº¨8W5Cå¢uXâ¢>X<)>ª¦¥!ÖåÎ{>¦q®ëÆ(9/`Oüåy^M£\0oæL÷_¿e÷G.ÎKð#>Æx¥Gù²Å¢²# TÅDsÍäÖ,\rO8'R1ÖÀùàüÜûªÏû/ÒôÎ×ÛàG÷úÜü\\39/ýøy\b¿«êñ\v`wÏób¢B`B)bÔó!´Ú§ÎÙ¦Â³ÖZçç<'påôü(Ô«\böÙØàÇ<F#vç?òº2[D´ÅÏvy8_æ<Ï{?Ö9ªÿ·{\\(<ÿ(Þ÷ü'Îµ|f^9oøg^çëÚðæ®Ãëþü|é{óDtùwÊ?ôYç§Î¾ÖscÚ8»é¼]³pe[ßögÇ)¨×I&¾rnåsâ[]ÿçX¶n÷çã|Þò·b½yÏFà·:~#]Ý9÷òo)F|÷^>,^¬kê|éÍZ£È\\6¯k¹v³× ·ìöZqaóéXþöÌÒ\"ÚéAq>V¨Ðå¹Op­yCëR$Ä¹¥.\n?Ë+!wcµyM\v<¿hg´2Oä#@Ñíþ:_~Þ¹ÔÒ´¹EÚMmûewÌ\r¨y#¸ÕXo,î''§Á6AV|/çÜ?\vÏ<kB®Cñ½ÄJ­X-¯5ÎO±{~\"½ëZsÑºI-m]^^ë÷:÷ùñXniøù\tøiçpg|Õç+×lÍy\bÕ|³±ëkÃÍ¹`z±ÊyÆ÷ð=½^ôûÌÍb!öYÆ}ù¥¹t¢s+Ïù2?WáÏøy[~¸ë¬³âë­I9Öæ:ÜôÐh±Î\\è«Äz Êó­¾gÄ×S»¶5çmá£ûyÄy9¹v.×ç\n¿¥ÍÀîåv9ª ´[àsÊ±|§ø/²÷Øié¡?ÍIÀ¤nÆ\vºº9·ÌóîÉ3÷þÚ®BÓáã!·ÿè°Ój!¨Î]|×1æPÃ¹\0¬°\bù%ÌÐÌ±ÎùÚ¤±n_ÎÜÕósÑ¾5îÍñüÄ½¦/?cÞÎ@3é3²íw|J»\0ÊÁÊÆA»~ljjqæè*¼RcÅq?@æqìsJ\0¢\vä^ÜÊtêSkÇ)kQó3m-Ò¬1-fÓð¿öð^Ýó4ùægÞß£q¦¦aÎ­s¢ÏuI?vn®Kãú\\]³·ü¾ÿ¯º©ðÐ8[_ëÉc#óðÅÃÅ]{D¤oç¥j¯ú<P¡ó@£\n;÷\rç\f?|ÔokúÂ\fÍ¨\b ñôåº,ð¤&2'5,x#}q\\íì¨Y\0V¬±ç\\¤¯ibÞm×àçÜÿfa\v¿<GýøiépXèØÞ³ü\f=8±öêÎàãg/ã¡TõSô.s|\\óSryÐC~lQå\"ÂtÌb ]/Þ_äy»\r+ºg~Ú:¤?bËÏ_Ý¾£~J\n]E_øÑ]/è\vÐ¨_pljTô\0?L\btCd\0,ý¼¼\\k\0â¿õÞOù)×\\øç¹kÜÛ]h~RCêZ·Ü×òKu~y.ÆÓ ÈîúBÛ½µÐüµv\v¼}§¿O¦º½ªÍ.hÔÞ¶Ëuc0ÔÃ`¯ßÞ2ÏÏëÜÖ·EÀ¯óÌW~ÚëYÖßð©lù+ÅÃ-$<qr°ócE#U¸£Í\t­Ráà5wZÎ\x002µ °R ²ô%¾æ»-¹¦-MËÝë/C¾·×â¼9~d+\t\n¨ÇùÀSÏx¸XTâ-èÁ)æ¬ø\nÜV×Rt¡â<u|?8>Ås«tnòßíóµjÇr,*»:¿5êô\t§kä¨tl®Ú%(Çîo[pr-\"èë;¨88pZkqCê\"ÐZ@\b³ô³¾\nD»??öþ%!ã¿½cÔ²Oû-àÜE\x009ûvjO9ör+y ]ëuc\"\\~ä`>n·ç>§«G>®¥¥þeR\0ÂÂ ®ç±Ã*iù´sÞá­Ýfé¯ú\fÊ6ýrù³ã¨­µ*Ç]B© h ­cD×ò1Æâ`­Cú¬X¹>ç¸\fzq}ÏÏr¯ßÎýwêØzXÇó[ë°¥qÈ~·)ø­1wk®ùxþèZãh­Ýc\r2ë¸ wõh\\®ÃZæãÄÂ=ö4;ÇÊup6:ÖbùkvÞ1rß_µQø§ýØNÿãhýÙØ¼pA°F!ÒÇ¯é<ÖIü÷2>kfiZ1Î?¿°Ci\0ihëng×sü¿¥4;>N¬\vý§¿·#¹â{{Ä]õtÖï¿?ªY±U=¢&ü«C±éu%_ZÀØñ-¿Ìo­¥â#ó¿êÈÞzk×BõZcÈ7cbÆsEë³ü'à·`äÍkÙÑÝSyäq&g yCzÑ¸\vwÔµÏ{ëÚrßO¾Õ³÷È,(âúJ[ôÐ/cUø/Ðh1hOhi)Ç[m»5º½§ëÅfÂéÉqEÛºÀU\r%¿\vàÊiåÇ2ÏèV~ìs\fÁõôäµe]wÈWpùk°,ó'¿Ë2ð»]]SæMÈ¼X¹º±£kkr{Ü?·ô\r\v5NY\t²Oi$KqD×\vßÆµkæ8ìm¸µÐ4,ógÍyCÀcZá§%WôxçE'áËÆEÙ-{5o{ÍyG\\;¨5\r\v6\v^/³­yäÝ2çÓq±wÌ>ÿË±·|d>Ë¢ÚxÆ¢ÿ\t<stnÇ}':}\nfJtn~Ì.<oþä+ MÅiù¤ôõâß°\0Ç®.Y\f¢âtéîÞë@·tµ8yvsyîý}ê¿äã%!RëÂÑó`CºßÊV¿¼ý·|\rH.ZbÞÔ\r|]¨«¾<ÿ|-_m;î&Àõ4GëâË×£N¾j-ø)±3|I¿°¬5D·»§1_ñM\tíõÐ|ópºrÌ:¶ ãÇë}çñÀ~õõÏÑ^úÊ¼åË-*Z^m.2~M$Sæ·B,ô¡\\\r­îV;7áq>»ªï¬»\\,¤¯Ô\":Á­åùùñÏ_üuº<öæÅµvñk}g\0¢¶44ø¡ûn)·ÞXdOù'!Oé÷j¼ËõK\0TÀ´\\~6^BÌg:¼\n8ûÌÔxoÞ|,*\nès\0mÞÒ×æÕÉ`þ8ôç\rÜäý¹ó'çË@Gó\n0ZÌ\bä&8ï­i¢Ë«Å@×\0]1DtçcÈü2ï°Y¬/3¯]ÓVNë5i>°â¿)ø#¸·íh¦\0£GW0£ù0Æ#rÀÔòD1È<×'p· ^Gvà\rïþ(W4ÖgËÇPè£m~gëÏÏgþ[¶­óSÜÍ+Àwb2·0ä\\ÇÊ³bÑ-5æåñtØ¥\0\nózPq\r@E¿ßÑX´¶eÑ6Û{ }-;Ð;ÂvvmLñW¡ÓÆC%Ú=tt4øNz[#º\0yÉíéÚÇ¢P'¼-Ðbøÿp§ïPñ`s0ô6­±zV§ó´ßDó´£\\¨kvu[ÑvwÝ1e­0|Úë\v´5¿4¤±çû§Áù­cmûý£9F¿\ràc\\Û²ÏóþÇË×úª/ãÀA3ÝüÖb¡1½[Ç¬õñ×)Ç4èÑ\t0X®mÅVÆÐûvcìùáuÆ*÷þÝ±þ[«Úø½-ðÙX\r@ØÂWÆ´µ\b .cZ,°£~»ÆxÞèO|×çÅõ¡åªÐ÷ÌCCÖÄu¬Úü!4¾¡«Ím^ø£÷\vt§¶ÿD±¦Xr\n5¦}M·>+\r:5}×\0\0AIDAT0OÇ&ºðÅ/ÈOÒ´1dN[51~qa þÚ\\§W»´ö&v¥¢áA¦Eºä\0­­7©¡uÑðÀÖ4,PÙçKÃÖ{íà\\Ã1ÒÖµÌý~s,©§B}üKÀ\v\rª4ÈÊ\\w¥»»9A@M}Ãß*6©­ýzmüsÐæ´®¿,Øþ 7´Ü1Ë#÷5¢ÉÍû=t)Ë/²Ä\\X2ú¿5ùëImÝÅÑNkÎ=ÆMÈ¹Eõ·æ:þÞ°Ã(H! a\"éïÍEú\bàüugÿÞßÒÿcòâ¦ £7ÁõæªEãÀK-wëÎAÓÆ<ÿÌý½6äÁ\\Ú½êÇ?àmÌÂ¡­!=×Bý½5{V¹ÿ¯ÂÝºïÓºÌi ÒMÀ£q¦JyN¼Ö2äH6Ç_,mvokzy4­F!i¨Õ9Ï´5íñÜ\t´\vK\\ÅG½q<^èÍiù9$¸XayÜôH-0 |5ÉéRÇæH¸¶·X~ªyµ`eÞÖÀÓ|4mmMZ^¡*&@Ü\t6//«'òaõæØûuåîñ¸R!à¯ÓÒí)Þ38)ß³Gs6öþþ£ïj>Þþ_õvàE¼õ%ëxsCÁm¬-]\fmë¾:ço|V$^¼÷'íÚ9´xo ¬CºµvÇ?HÚö#]~âL\vTo¢3\rµ¦ä\bw4ÔùüÑíR¤ïWäÃu<,X\\¦Ï%Ç-ó\nR&õÄ_{íÝó'|·\nÄG¬#sÐûF¹<G¯ä#.x\\J\tNàúð7h!]_ñ\ruÄ{­új>Þz¤¯è\\ævXùÚáèd|¡Z.º^\\^ÎLq^ñuwÒ·ëC ÜDWÐ:¾üM±äiPZ>/²Åör.]©'>wÕWË)}´9kªXÂ¨ñ?í\b|h3¾@myE*\t_øHÒUÞÔ\fÜÏü¾â3 ×t3°§ë«Ì­Ìkº$|+µ\nüÓÝ=³_t{ ãé®sk½¯±~¨{Ë5X`²5¡º§nø^ô£XúûMÙ\t Oûµ×(?SKiúIU5_DWÑ¿ÌY¾¡ãÃvuþÎN ³ú¥ñ\ròdÃhpÖ\bùRf~ág|åë^Ïå}Îæá¯\v¹ç_&}3[þÊçd\nDÕ:ÿ¯¾Ðw÷N·WcÖ9'tÆC¬îÚX¶fÈWüNíH\\¬<Xç|¬  ±ÉXáëvH,²Fnÿ£ÎÌÖþ\0m»È+ð®ìæ5 Ð×y6ÖÑ;¾Wb\t\b¤\vµ¶ä/üägiÈMËÉ¯æÕÎ+·\0Ò¶ý{þÂ9´@¦¡]/DËíàë<xÐn@[¯%\v-ÓªtüSÇkªËEþdnGS5ôNY`µ\\Ñ-j£ÿníbÛ¡É~»Á^C©i[ë«¾üv«xßOÝ,¼üÕª<1w4JPqíj¡ðü¤vEC³ðºyR32¨uÑÎ\0­üÞ,Þ<ºîè7°`jkæÁÁli[°\b&TÍÌ×QeN¶¶f#ðãÔ¯àÖùðZÒ\0#k\tÆ[ GóÖëìøMÒ²èC½\b0ëóàkr¡ä­Á;·rUòUÖ$­Ìä¹yÁÊs>^µ¼®J\\°æ1°«q(ÚïíRÁ\0°æ½ñh-hÏæ®¥ÁÒ>+89n`­ÝoúíÖ!Ð¬÷CW-\fÕytÂÝµª®Sá¿\vöjÞ®ßT|0¿uÛ_ñÛUîú~ÒªóèxF4~wñXðÄîóÝq¯¿k¾ë?ßý]ØÞ§âÐ.:ÆÑyï÷³ó¯ßËî:7¿h£@Gýªþïö[¾ÁÁûòëGù#Ëæ°Ûá¿!î]º½ù¢×È_K£\rv5nÜ¬ewS÷ørYkö:¯ZGçá7/Py.ÆÇ»½³Y Â¼?w\r¼ÓªvA7Öâ-5´lñè©5köJø#¨'·ðÝ®^)fÓ ÜY ±É.èò=èj\"9£÷_Z÷\0CùÔóé?êÚð@E±¨å¹«¢øÖíüÊøäÚº÷ È.Àºù´vÕ¬yH¬õ:<ÛÿxW4ÓP3C/ú·¥í|KÑÞÕé'µäïßRG\0 Ï\0´X´Hì\0·ú\"@j>»¬¥Ä@lh;À7,ØÑN/Þ£±¢i\"0ZZ·ûË2Å³\tøÍmn\"6Óm±ÆÅ<±¥/mÙ­u ±B@\rÅZZ5l^Tù\f \rñ¾\f;²\t Ø¨Àh±hQ\"jÀOÅ®LÅ[\"D¾TÇ¶b½(ö®B c31ÀJ\fUcÙ{[±¬Óí½<(ÈHZíÿOþJ}\"½\vÈÄÁZ(S\bÂ<2ÖÑuc5M}6[@bî[)$ÅÀujZþÌ÷é_\bÜï\0ä®. B§½¶WÁYK|\tR$@]Bb<_¯\vG1äXÆwÙ._¢¡Îï@è!»Â\0Àî­¯sO_Ý|­õj>Å{0êË>D¯í+ÞËMnÏÇó\rÖúÀðSÒ]A2gª£ËÜ^ò\v¬¥ëè¤v\v5¶CVoÈÑQ}I±Ì½~¥s¡µNm]gø3÷ø% e@örd xjGàvwù:=­\0  Êµk>\bÌ4IC@äÌÃFÏgÒFà§&äRê:,e.U\b´xáëåºûc-£ÅaÚG¼ïéÂA!OÓ3>Ú\\3_£\v2Å(³Èøíy*~'ÐZ~då5·\n^~-ÃEÌïhÃpù·ññÁ·p®/}Äç¢æÐâû~ÏÇ[bQ|«ófJ{ h¸Ûfo\nAy' ÍÉ59qi¸åÚ¼xt.s/ÏßDoÜÊ§ò\"kÚ<N«X÷vÂ²ü`aº¹¿uÎ[K±H Ûvuîâ&á¾k.¼w»@U«vòn04Ýùðw;ö@³s£yë\vÊl÷µ5¤wHqx¬c;Àüðæº;Äu,,«nû½.õOÍñ±\"áÍe¡´ª@ÆdÅ?*\0¬jÇ¿~ðµZ©Pì\0Þ#Å´9ôÁ¼Ô² {ë²ÌÀ'ý£»ìmÀÖB ù]ACýµ9¡C¾Áß¹ëÏ?\0ä6(æ\\aëò÷,\vºåïÁïîò8È\tmõ\rÔ°³KÍÏ[c¤\vÌÓÜÑ(ìùûõ¶ôçcÕBuþÆ´¥à§<ÌV@xgªuø\tP5Ýìî@óË­éf!×¡ßÝ'ÆNüMï\0ïéfwÙÝAdâ¢[«ch®$à#^óë\fjÛ}4vènwlYÌHwxt\f5ehÉØüª¿2?éXì_º`ìMmì6 ;cÆ7\0[@º³§}ðåó±Ý\tÿí{±?6¿\vÄv¬7¦½Çk})äÑ½}v~SÀgýÐØ»ÿ®¨?õ Lv¥d»o¸®©â\\WÒ,m´CGð.«æÞ+4|5´Hÿ|ÄØË\0¶ÖÓÐQa®®C¹.]1aÒ(\r­kóäÄ,Ó@­\0ïùEóÓý2ë!êuþÊÎ`ª8tïß§·újî(¦Ç,$Ú<9EáâjÌ².äÀÚ.15¿¬|î© \r?;jv÷hÞ¾+¨©ÆXóÌÔ\x007³òDÊ|;({Ì/Co¢>?U8xËÍ|Õñ)ø£J÷îÎWºm\b¸Ãç\r]M«\x004rVÀìÎ§!EÌÄxÅÄÒîå/pFðUvN~Ë­eü!¨ï>Ï/VÅ·h»hhk²æ30R½s¿l^ñ­ÌCÌ&ã»@ï.\bx¢ÁÎoT'\rÒ¼8vç3ZM¨y\\ê~¼\x000¤%>àwÒ²¶àh.bVyvð8&iÕ£Y4¿ó+ÀüWÝºOÞ&¤v\nh!ýµWo\vJÅä»å»rZ#0ó±I°­ùÌv^ø´|5s^ïÅ7ÒªúJëÂ2³uç¦p·øjÅÆ\n\0ûP3¾íb0\t»7îKÌ¢Â}'\nFwoålj7àÂO¹ÎÞ[«ºÖEä\váÌä`ãNàÓ^w#ìÕ8×7ó²`<ÆÉó Î+.c^\b~BçrIÀ­æ³«qÆ:2 st\\êµN+Ñ¸vEº-ÇË²ÅC³jÜÃßÕ@LÓØa0üwå¬F\bô0¤Õmúékdâã)\nÔü5TÖ!':w¦\bT\vÉcü¢7QµV\r-ø«Ûzn\b(g§XT\vGµ°cyu§].Sp:9Ç´Ç$-\v0Q&OV;ÊÃ­R4ªðsËÜ³·s¢£§ó\f\0~ì]Í9\tøhÎNG_ÖÑëÀ\\µÌklþV7Ï]cv½;îÄf¡Äx½;\0/SÆ2þÈÚ³>¶~È§(\r]±ÁTÞp½à#¹&vïd[áßTPÞèNì;±ÿ¿ûÝÿAÔvwþôø´ó½¸æãuL2ý~ØwÙÔZ_öç½r¼\0ÎÝ¯s+\0±ÝÅàßºXX·æ¼£[Ôa(ô.\n)ø©\0Î&ïîæÛÁC{¤ó|n;_RÎ'ý: JÛUDH|]«=¢<üÝN~\vÌ,G©k<­]\v\0gI«[@µ[­²õïÀîÙ¤¢»ÛBø©\0©éçI{`nÇ{1À±§=\rúîmz%&n%¾h¶pxÖíôÅ8?½¥'2Ëo4FMÍnnÄ»1\0h.¨.Ü¨ßH÷'ªmãQ?Ë^3eðÃõs Eü*1Ý\0º2,×¸ö\rpoÑÛã\nÄAQ\bý<m´ë[y<ÛýOz+Ìós\nM¥ÃÀµ¶w»õºÅAúm*\b¨_TtÛêí,$§ý%?ªQ³óq;As5Fe¯«ÒSsÇºÊ s¡ßÆø¨(ìèÜDÁxÙ÷*sh/í}èA`FCÂË4§\v«ñXçVèA÷æÆ4ªsð«°k{´`T-[$*ðOtñ±¸háÓ©lÅÃ9®Û\blëõì^Wa.¼uâªÜÐÅ¡sY_\nn9nCçcEóò=ÖþÃkønÕ¶ZôV#×µ6üäCì]à2*_¾¶N¤YÙ-´t;Aoëd¶ìð'´ê\\Æº:üäÃ7qY'Ð­ú2Ý*ä_ËzßPg @d|=ÐLßà{ÅE kúzVÝ!T|Qø3\\Zu»íêdu©XHÄy\b.Ë³­ 8±mßÇúÓ`OòU_y¾Ù×4Z¦ìÒ¶ütðN¬ô%»k§!fZàåy*ÏcÓwb§:¶ê{Cliûõ Ìì¢Ømùoø- *Êy'¶z;gÀ¹¶Bîh¥cÙy;¶¨Ýô\0ÍÏ2y#»åô.\vàïl»[Ý?yî®««ýX{¥ ZÑùdÁpÎ; CZÅ\\eÐ\\¥Ýv±I-ËvÁéu #\n Í¦;\vBáüÎ\\[Aîæ9Æßú®vçö`ÊLø§A7>©·µ¸Ü|®ÀÖ÷Jè³çcpÜ}~÷oÚ4~þÃ·Ñ5 Ù|DoyÎ^ÓdwÞ¹ÞÛA7ýl¼åÏá»îOoXÖRù¹sÁnYÃ;6¶û|ë¦ÁçÃÝðgá,d,\\#9f÷ücPÞXH\\ÍiÐÛ¡YµQø\ty@#,4P\0º;w\tuBSc\fr6V.$\t\r\tyK2[\\4;Öötê\0ä)iL\r¹³£«Wbvl·+1£Ý<'¥QÌãI´v\n]ø+°ÅgdGðÛ<g%fKHêN@itóTføH\fb»dá¯téR÷×|&\n«Ôñùï*\nÚ»èQ]ÔÇè Nê)iwéV}w~c¬ÒËpW|VÊÈçEEAkùùßX:¦Óµ±·õÑÆ´N¼\vâ;¾%hÃOØPA@´±)¢â®è6wj· gcÏNívw×ÆªàOÉ¸e.üZíôP÷µ¦ 5ãÄºÊù5\n-® õj Ý¸¤y:N³jª·à¯nÏ«ZcZc»¢êZUSZý6ÐZèÒÝ3cÒ44'bÙ¸\nüA\0¡úHÁAsc-këæ¼æ¶~a,\rªßéîÅ\0µ]úSðßÑýwÎ\tXónà;c»a¾c¬ÔU_56Ùõ+v7üDÿC¨½Qaã?ÌÖÅïÛ½|¢:ü\b·Æz:àlËCÂ ÆÑ±»ò¤ÇÒ]¼çÈ3ÖÉÙXçOÆ·\nO`xè¾U±hhòüe#_èÖ¥<f§Á7o×BøÉR³L|·(X¾L®» NÇ7|·Æ¾wñ½×¿»µïh×Àéþ]Ð­ñiÃÎ éÛpoîQ_6Þ|Ü×¬[d,ënøµ.;úÖbAJxälÁ®g|'4Æï[öÖ(ûZãð-{eAhuþLQ } [ã8·ìøÕÈOh°ñL·¾hdÁßY,>#Û¿iAÏ»àQbw`o*$Ùñ\tX­ñ\t\0³ã·æ|¢ ì°ÿ?ã9à(Ñýßqúëß\tÞ?zÍmðUàß¹N\tÿ«º?Ñ=@uXÂwã¹ß±Ð¹-ãZÁ×^î¾ã/Û\t¶{zsS Oj ÒÀíÃS\bqR+\v×¤Ã±àf1ÙñI-ü»E~òaNÇò@7b&»wCFqHæ)\b/&¡·\r`ºFç®ÄÏ*1Ý¿á§\"°¤wO¯²3põkÛ9s\"ÙAÜõ´\\\f®íéMvîTLu®ªg¿Úýß¡\0¸¹ÒÐzs^K«tko®ïö\\àÜÜÞ\\UoôÿÒËÎÕ9ÏeØwSæï÷-æØüø={×Æà§ùî¿â,xÂØê³5gÌ¿Ð»tGæÄüm6çÆsNýÇ=SðÍ®âÆn\0¹ëÁÓ­BÙu±Up;±i@wÁÍwàÎì2²ð·C0ß*\0µmÙ]8ó»@æwÁÍÅ&çGcóã±Ñ|~îÈ¦áoªh¾yw¾zw¾l4ß²;ß³;_sÞ®]à§`#óßï\b1_ßËA7|Þj^ñ¹}^ø¼å<Q¿ëgç5øÛÝúh`@´ò\t.è»aÐè7¡±µÛß¹Ý_V\0x'4\0hðôi\0\fk4}î\0ñ¹æFÁ'i«Ñ¾ÿçFþ»à}Ö²\"Í\0ßé3úÅÇð{ïôiAO4þ®OÔÁmv^îwW¾qÈ¿;!¾;ßV_hDïÏwä«üEõ.DÀnÍø!@mÓrü¦\0Eý¶kýÞ\nè_ÕTøiØWù¥Á¥û\nêWêÔ?â;\tòÞõcc@ßágÁ?Ýý`?t'v%MÀ7]0MÔ¯¬éøNlúe| ~ßæ¶¿¬\r?áPïòÝQ¾¿üîw/\nå.ßv!Ê/´wøB0ïòÕl~¢à±IX³¾;µË ¾àø·}.Pº¾þïÚo>?å Íúg ÞíK!\0cvúgÀÍúg:õ¨¿3\n¼ðÏ¹Ûßò÷àÏv¢½¨X1N\\ñoç\0bvBnú;1pCÿJÌ@-³mþMÃO´èVL2®U<À¸ n7än7£ÄeácDÜ1c]ø)r'î. «q.c+pWãî¼W·W·¸\n¾Á_íþDÂñÈ[*Ø;¡îÆ v\väNlôNìvàEì(ÀÛ\t?Q½\0ÕÀ3¶_-Ød|l3¯ÆñÛA7â«Ð¦cE|\tÞ]àðS`¢ÄÏøFæK|A£µÐèÀÆÈáxG£{:^Ñè@_gf<?Q¿\0õÀS£©Ó-¢NjW#¡ÓÒ\0tº¦5\f.¬e\r¡ÓêöÈ¿»ýç6Q:Ë¦ACkæi­\t°!Poð£7{YGÑÛ²Å×\ffºÿIh¤\bôMí04o)\fEÍ)°Ózæ-=CsÒÐ£Ï\t2ðÍ\0¢­¼«;¨=\tq¨ÙÐ:­Ð¼¬èOÃ9®Ë´!Í,üD{\nÀSì,rLÜ´9¦¶Ï#ÚÓw¾cËÖ>>Q\r~Z\t6Seòíèæ©<9wÜÊSÈ·¾-y|[ïã«·UøíÜ¨ùäÀæü;¶äíÃù§TÝ¯|ùKùºðO|s!¸ävÓzîµ_Ú«´WÍîÞ9D6õÌ`~n¯.Ò^Ñ¹#»cË±;¶½»¦WïPÛñp~nwÜ¯OØ]÷Éön ZöXî~~±Óîxn°~i»¶ßiw=ºÃ^zñ¿â¡ê;Ùß6Xv'üíúNúG±ÿ%ø*öÃÙÎ¿´w?c?Ê¶÷G²ÿ9ø2ö¿tÛµ>|ø§_üÿhû·øýsíÿ\0âI1KÊ±\0\0\0\0IEND®B`",
            barImage: "PNG\r\n\n\0\0\0\rIHDR\0\0\0\0\0\0ÿ\b\0\0\0wÁa\0\0\0\tpHYs\0\0\0\0\0\0\0O%ÄÖ\0\0\0$zTXtCreator\0\0\bsLÉOJUpL+I-RpMKKM.)\0AzÎjzÅ\0\0\0IDAThíØË\r@\fQý×Ë/Ôà@\bÍÞ|¬[³WÒú=°<¾\0\0\0\0\0À/[W¶°É)È\0\0\0\0\0×gu4e Â6QþÈ\0\0\0\0\01`i:t'%\0\0\0\0\0ø(°º2à¬Ta¨Â?\0\0\0\0\0\0ÀGXî=Æ\f\0\0\0\0\0÷;<Ùo´\"ÙtbiA\0\0\0\0IEND®B`"
        };
        if (config) {
            config.dataFontSize && (ColorPicker.dataFontSize = config.dataFontSize);
            config.picker && (ColorPicker.picker = config.picker);
        }
        var pickerSetting = ColorPicker.picker;
        var window = new Window("dialog", ColorPicker.name, [ 0, 0, 640, 400 ], {
            closeButton: false
        });
        var leftGroup = window.add("group");
        var colorBg = leftGroup.add("group");
        var colorSrcImage = leftGroup.add("image");
        var rgbPicker = leftGroup.add("customboundedvalue");
        var rightGroup = window.add("group");
        var colorBarGroup = rightGroup.add("group");
        var colorBarImage = colorBarGroup.add("image");
        var huePicker = colorBarGroup.add("customboundedvalue");
        var colorDataView = rightGroup.add("group");
        var sample = colorDataView.add("group");
        var colorDataGroup = colorDataView.add("group");
        var hexColorDataGroup = colorDataView.add("group");
        var hexTitle = hexColorDataGroup.add("statictext");
        var hexTextBox = hexColorDataGroup.add("edittext");
        window.margins = 5;
        window.spacing = 10;
        colorBarGroup.spacing = hexColorDataGroup.spacing = 0;
        window.orientation = "row";
        leftGroup.orientation = "stack";
        colorDataView.orientation = colorDataGroup.orientation = "column";
        colorDataView.alignChildren = [ "left", "fill" ];
        window.size = [ 640, 400 ];
        huePicker.size = [ pickerSetting.hueSize, pickerSetting.hueSize ];
        rgbPicker.size = [ pickerSetting.rgbSize, pickerSetting.rgbSize ];
        hexTextBox.size = [ 64, 16 ];
        colorBarGroup.minimumSize = [ 25, 265 ];
        colorBg.preferredSize = [ 255, 249.9 ];
        sample.preferredSize = [ 54, 32 ];
        sample.graphics.backgroundColor = sample.graphics.newBrush(0, [ 0, 0, 0 ]);
        colorBg.graphics.backgroundColor = colorBg.graphics.newBrush(0, [ 1, 0, 0 ]);
        colorSrcImage.image = ScriptUI.newImage(ColorPicker.srcImage);
        colorBarImage.image = ScriptUI.newImage(ColorPicker.barImage);
        hexTitle.text = "#";
        hexTextBox.text = "000000";
        hexTextBox.active = true;
        window.defaultElement = colorDataView.add("button", const_undef, localize(ColorPicker.ok));
        var hue = 0;
        var rgbPickerBrushColor = [ 1, 1, 1 ];
        var sizeOffset = 255 - pickerSetting.rgbSize / 2 - pickerSetting.strokeWidth;
        var changColorData = function() {
            var hsb = [ hue, Math.round(100 * rgbPicker.location.x / sizeOffset), Math.min(Math.round(100 - 100 * rgbPicker.location.y / sizeOffset), 100) ];
            var rgb = src_hsbToRgb(hsb);
            var colorData = __spreadArray([ 0, hsb[1], hsb[2] ], rgb, true);
            for (var i = 0; ++i < 6; ) {
                colorDataGroup.children[i].children[1].text = colorData[i].toString();
            }
            sample.graphics.backgroundColor = sample.graphics.newBrush(0, rgbNormalize(rgb));
            hexTextBox.text = rgbToHex(rgb).substring(1);
        };
        var changHueColor = function(e) {
            huePicker.location.y = Math.max(Math.min(255, e.clientY + huePicker.size[1] / 2), 0);
            hue = Math.round(360 - 360 * huePicker.location.y / 255);
            var value = src_hsbToRgb([ hue, 100, 100 ]);
            colorBg.graphics.backgroundColor = colorBg.graphics.newBrush(0, rgbNormalize(value));
            colorDataGroup.children[0].children[1].text = value[0].toString();
            hexTextBox.text = rgbToHex(value).substring(1);
        };
        event_mouseMoveElement(rgbPicker, changColorData);
        event_mouseMoveEnviron(colorBarImage, changHueColor);
        rgbPicker.onDraw = function() {
            var offset = pickerSetting.strokeWidth / 2 + 1;
            this.graphics.ellipsePath(offset, offset, pickerSetting.rgbSize - offset, pickerSetting.rgbSize - offset);
            this.graphics.strokePath(this.graphics.newPen(0, rgbPickerBrushColor, pickerSetting.strokeWidth));
        };
        huePicker.onDraw = function() {
            this.graphics.moveTo(8, 0);
            this.graphics.lineTo(1, 5);
            this.graphics.lineTo(8, 10);
            this.graphics.strokePath(this.graphics.newPen(0, [ 1, 1, 1 ], pickerSetting.strokeWidth));
        };
        var loopMouseMoveEvent = function() {};
        for (var i = -1; ++i < 6; ) {
            var g = colorDataGroup.add("group");
            g.spacing = 0;
            g.add("statictext", [ 0, 0, ColorPicker.dataFontSize, ColorPicker.dataFontSize ], ColorPicker.units[i] + ":").onDraw = function() {
                this.graphics.drawString(this.text, this.graphics.newPen(0, [ 1, 1, 1 ], 1), 0, -ColorPicker.dataFontSize, ScriptUI.newFont(this.graphics.font.name, "", ColorPicker.dataFontSize));
            };
            g.add("edittext", [ 0, 0, 2 * ColorPicker.dataFontSize, ColorPicker.dataFontSize ], "0", {
                name: ColorPicker.units[i] + i.toString()
            }).onChange = loopMouseMoveEvent;
        }
        window.layout.layout(true);
        window.layout.resize();
        colorBg.location.y = 0.1;
        rgbPicker.location.x = -pickerSetting.rgbSize / 2;
        rgbPicker.location.y = 255 + rgbPicker.location.x;
        huePicker.location.y = 255;
        colorBarImage.location.y = 5;
        window.center();
        window.show();
        return {
            HSB: [ +colorDataGroup.children[0].children[1].text, +colorDataGroup.children[1].children[1].text, +colorDataGroup.children[2].children[1].text ],
            RGB: [ +colorDataGroup.children[3].children[1].text, +colorDataGroup.children[4].children[1].text, +colorDataGroup.children[5].children[1].text ],
            HEX: hexTextBox.text
        };
    };
}());
