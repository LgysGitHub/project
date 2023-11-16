import jsyaml from 'js-yaml'
import fs from 'fs'

interface ISubjects {
  [l1Category: string]: {
    [l2Category: string]: {
      order: number
      branch: Array<{
        name: string
        isK12?: boolean
        icon?: string
      }>
      level?: string
    }
  }
}

const Subjects: ISubjects = jsyaml.load(fs.readFileSync('./subjects.yml', 'utf8')) as ISubjects
const createdDate = '2023-02-03'
const CategoryIndex = 'subject_categories'
const TagIndex = 'subject_tags'
const L2IconAddr = 'https://bucket-iteachu-assets.oss-cn-shanghai.aliyuncs.com/subjects/l2Category'
const K12Levels = ['小学', '初中', '高中']


let bulkBody = ''

for (const l1Category in Subjects) {
  for (const l2Category in Subjects[l1Category]) {
    const l2tree = Subjects[l1Category][l2Category]
    const l2icon = `${L2IconAddr}/${l2Category}-small.png`

    // { "index": {"_id": "体育与竞技_球类", "_index": "subject_categories"} }
    bulkBody += JSON.stringify({
      index: {
        _id: `${l1Category}_${l2Category}`,
        _index: CategoryIndex
      }
    }) + '\n'

    // { "createdDate": "2023-02-01", "l1Category": "体育与竞技", "l2Category": "球类", "icon": "棋类-small.png", "order": 1 }
    bulkBody += JSON.stringify({
      createdDate: createdDate,
      l1Category: l1Category,
      l2Category: l2Category,
      icon: l2icon,
      order: l2tree.order
    }) + '\n'

    if (l2tree.branch) {
      l2tree.branch.forEach(br => {
        // { "index": {"_id": "球类_篮球", "_index": "subject_tags"} }
        bulkBody += JSON.stringify({
          index: {
            _id: `${l2Category}_${br.name}`,
            _index: TagIndex
          }
        }) + '\n'

        // {
        //   "createdDate": "2023-02-01",
        //   "subjectCategoryId": "体育与竞技_球类",
        //   "tagType": "branch",
        //   "tag": "篮球",
        //   "isK12": false,
        //   "icon": "",
        //   "order": 0,
        //   "useCount": "0",
        // }
        bulkBody += JSON.stringify({
          createdDate: createdDate,
          subjectCategoryId: `${l1Category}_${l2Category}`,
          tagType: 'branch',
          tag: br.name,
          isK12: br.isK12 ?? false,
          icon: br.icon ?? l2icon,
          order: 0,
          useCount: 0
        }) + '\n'
      })
    }

    if (l2tree.level) {
      const lvs: string[] = l2tree.level.split(' ')
      lvs.forEach((lv, i) => {
        // { "index": {"_id": "球类_青少年", "_index": "subject_tags"} }
        bulkBody += JSON.stringify({
          index: {
            _id: `${l2Category}_${lv}`,
            _index: TagIndex
          }
        }) + '\n'

        // {
        //   "createdDate": "2023-02-01",
        //   "subjectCategoryId": "体育与竞技_球类",
        //   "tagType": "level",
        //   "tag": "青少年",
        //   "isK12": false,
        //   "icon": "",
        //   "order": 0,
        //   "useCount": 0
        // }
        bulkBody += JSON.stringify({
          createdDate: createdDate,
          subjectCategoryId: `${l1Category}_${l2Category}`,
          tagType: 'level',
          tag: lv,
          isK12: K12Levels.includes(lv),
          icon: '',
          order: i + 1,
          useCount: 0
        }) + '\n'
      })
    }
  }
}

console.log(bulkBody)
