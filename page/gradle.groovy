public class ProjectVersion {
    private int major;
    private int minor;

    ProjectVersion(int major, int minor) {
        this.major = major;
        this.minor = minor;
    }

    int getMajor() {
        major;
    }

    void setMajor(int major) {
        this.major = major
    }
}

ProjectVersion v1 = new ProjectVersion(1,13);
println v1.minor

ProjectVersion v2 = null;
println v2 == v1

//groovy ��Ч����
//1. ��ѡ�����Ͷ���

//def version = 1

//2 assert
//assert version == 2

//3 �����ǿ�ѡ��
//println(version)

//4 �ַ���
//def s1 = 'imooc'
//def s2 = "gradle version is ${version}"
//def s3 = '''my
//name is
//imooc'''

//println s1
//println s2
//println s3

//5 ����api
//list
//def buildTools = ['ant','maven']
//buildTools << 'gradle'
//assert buildTools.getClass() == ArrayList
//assert buildTools.size() == 3
//map
//def buildYears = ['ant':2000,'maven':2004]
//buildYears.gradle = 2009
//
//println buildYears.ant
//println buildYears['gradle']
//println buildYears.getClass()

//�հ�
def c1 = {
    v ->
        print v
}
def c2 = {
    print 'hello'
}
def method1(Closure closure){
    closure('param')
}
def method2(Closure closure){
    closure()
}
method1(c1)
method2(c2)