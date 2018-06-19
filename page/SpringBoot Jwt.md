##SpringBoot Jwt
####什么是JSON Web令牌结构？
- 在紧凑的形式中，JSON Web Tokens包含三个由点（.）分隔的部分，它们是：
    - 头
        - 标题通常由两部分组成：令牌的类型，即JWT和正在使用的散列算法，如HMAC SHA256或RSA。
        - 例如：
        ```
        {
          "alg": "HS256",
          "typ": "JWT"
        }
        ```
    - 有效载荷
        - 令牌的第二部分是包含声明的有效负载。声明是关于实体（通常是用户）和附加数据的陈述。有三种类型的索赔：登记，公开和私人索赔。
        - 已登记的索赔：这些是一组预先定义的索赔，这些索赔不是强制性的，但建议提供一套有用的，可互操作的索赔。其中一些是： 
        iss（发行者）， exp（到期时间）， sub（主题）， aud（受众）等。
            - ***请注意***，声明名称只有三个字符长，因为JWT旨在紧凑。
        - 公开声明：这些可以由使用JWT的人员随意定义。但为避免冲突，应在 IANA JSON Web令牌注册表中定义它们，或将其定义为包含防冲突命名空间的URI。
        - 私人声明：这些声明是为了同意使用它们并且既未注册也未公开声明的各方共享信息而创建的。
        - 一个有效的载荷可以是：
        ```
        {
          "sub": "000000",
          "name": "hyman hu",
          "admin": true
        }
        ```
        - 然后将有效载荷Base64Url进行编码以形成JSON Web令牌的第二部分。
        > 请注意，对于已签名的令牌，此信息尽管受到篡改保护，但任何人都可以阅读。除非加密，否则不要将秘密信息放在JWT的有效内容或标题元素中。
    - 签名
        - 要创建签名部分，您必须采用编码标头，编码有效载荷，秘密，标头中指定的算法并签名。
        - 例如，如果你想使用HMAC SHA256算法，签名将按照以下方式创建：
        ```
           HMACSHA256(
             base64UrlEncode(header) + "." +
             base64UrlEncode(payload),
             secret)
        ```
        - 该签名用于验证消息在一路上没有改变，并且在使用私钥签名的令牌的情况下，它还可以验证JWT的发件人是谁说的。
    - 放在一起
        - 输出是三个由点分隔的Base64-URL字符串，可以在HTML和HTTP环境中轻松传递，而与基于XML的标准（如SAML）相比，它更加紧凑。
        - 以下显示了一个JWT，它具有先前的标头和有效负载编码，并且使用秘密签名。 
        ```
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
            eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
            SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
        ```
- 因此，JWT通常看起：xxxxx.yyyyy.zzzzz
    