##Maven实战学习笔记
####基础知识
- 定义：
	- Maven 是一个**项目管理工具**，主要用于*项目构建*，*依赖管理*，*项目信息管理*。
- 下载安装：
	- Maven 官方下载网址：http://maven.apache.org/download.cgi
	- 解压
	- 环境变量配置：
		- MAVEN_HOME：bin的上一层目录
		- Path：%MAVEM_HOME%\bin
	- 测试部署是否成功：`cmd` => `mvn -v`
- Maven项目文件结构
	- src/main/java - 存放项目.java文件
	- src/main/resources - 存放项目资源文件
	- src/test/java - 存放测试类.java文件
	- src/test/resources - 存放测试资源文件
	- target - 项目输出目录
	- pom.xml - Maven核心文件（Project Object Model）
- Maven常用命令
	- mvn archetype：create 创建Maven项目
	- mvn compile 编译源代码
	- mvn deploy 发布项目
	- mvn test-compile 编译测试源代码
	- mvn test 运行应用程序中的单元测试
	- mvn site 生成项目相关信息的网站
	- mvn clean 清除项目目录中的生成结果
	- mvn package 根据项目生成的jar
	- mvn install 在本地Repository中安装jar
	- mvn eclipse:eclipse 生成eclipse项目文件
	- mvn jetty:run 启动jetty服务
	- mvn tomcat:run 启动tomcat服务
	- mvn clean package -Dmaven.test.skip=true 清除以前的包后重新打包，跳过测试类
####pom 进阶教程
- 传递性 transitive
	- maven的依赖关系是可传递的。比如：如果A依赖B，B依赖C，那么A也将依赖C。
	- 查看项目的依赖关系命令：`mvn dependency:tree`
- 作用范围 scope
	- compile, 默认值, 在mvn的编译/运行/测试/打包过程中, 都会将依赖加入到classpath, 在war包package过程中, 默认情况下会将依赖的库导入到war包的lib中。 compile类型的依赖是可传递的.
	- provided，只在编译和测试阶段,将依赖加入到classpath, 在运行和打包时, 会忽略它们. 在运行时,需要jdk或是容器(例如tomcat, jetty)来提供这部分库 . provided类型的依赖不可传递。
	- runtime，只是在运行和测试时, 才将依赖加到classpath. 比如, 通过配置文件/依赖注入/反射机制调用所依赖的库时, 可以使用runtime, 因为代码里没有直接引用依赖, 因此编译时不需要链接所依赖的库. runtime类型依赖是可传递的.
	- test ，只是在测试阶段使用, 不可传递
	- system, 类似于provided, 但是maven不会在仓库中搜索依赖, 而是需要使用systemPath(绝对路径)来指定搜索的目录. system类型依赖是可传递的.
####Maven的生命周期
![](https://img-blog.csdn.net/20160114103206331) 

- maven指令与生命周期阶段的关系
![](https://img-blog.csdn.net/20160114155000416)

- maven生命周期各个阶段的行为与maven默认行为
	- mvn compile  //让当前项目经历生命周期中的1-->7 阶段 ：完成编译主源代码编译  
	- mvn package  //让当前项目经历生命周期中的1-->17阶段 ：完成打包  
	- mvn install  //让当前项目经历生命周期中的1-->22阶段 ：完成包安装到本地仓库  
	- mvn deploy   //让当前生命经历生命周期中的1-->23阶段 ：完成包部署到中心库中  
- jar和war包类型的项目生命周期阶段的默认行为

![](https://img-blog.csdn.net/20160110150247814) 

####Maven插件
- 将依赖Jar包打入项目内
```
<build>
        <plugins>
            <plugin>
                <groupId>org.codehaus.mojo</groupId>
                <artifactId>buildnumber-maven-plugin</artifactId>
                <version>1.4</version>
                <executions>
                    <execution>
                        <phase>validate</phase>
                        <goals>
                            <goal>create</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <artifactId>maven-assembly-plugin</artifactId>
                <configuration>
                    <descriptorRefs>
                        <descriptorRef>jar-with-dependencies</descriptorRef>
                    </descriptorRefs>
                </configuration>
                <executions>
                    <execution>
                        <id>make-assembly</id>
                        <phase>package</phase>
                        <goals>
                            <goal>single</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.5.1</version>
                <configuration>
                    <compilerArgs>
                        <arg>-Xlint:unchecked</arg>
                    </compilerArgs>
                </configuration>
            </plugin>
        </plugins>
        <finalName>${project.artifactId}_${project.version}-b${maven.build.timestamp}.${buildNumber}</finalName>
    </build>
```
####Maven搭建私服
- 私服搭建
	- 下载：https://www.sonatype.com/download-oss-sonatype?hsCtaTracking=6dabb730-f832-4d36-bb3b-0110f26413b0%7C7852b187-0719-474b-be13-ce84f7399ed0
	- 解压
	- cd 到lib目录：cmd使用 nexus.exe /run运行nexus
	- 浏览器输入：http://localhost:8081/测试是否允许完毕。
	
- 连接私服
	- maven setting.xml 配置修改
		- setting文件设置：
		- ```<mirrors>
     <mirror>
           <id>test</id>
           <mirrorOf>*</mirrorOf>
           <name>test</name>
           <url>http://10.8.4.78:7871/test/content/groups/public/</url>
     </mirror>
  </mirrors>```
	- 项目pom.xml 配置修改
		- 编辑项目下pom.xml, 在`<project><url>....</url>${这里加入配置}</project>` 
		- ```<repositories>
 <repository>
    <id>test</id>
    <name>test</name><url>http://10.8.4.78:7871/test/content/groups/public/</url>
</repositories>
<pluginRepositories>
    <pluginRepository>
      <id>test</id>
      <name>test</name>
      <url>http://10.8.4.78:7871/test/content/groups/public/</url>
    </pluginRepository>
 </pluginRepositories> ```
