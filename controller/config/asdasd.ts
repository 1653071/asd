let a: array<any> = [];

const updateLayoutByUser = async (decoded: any, userID: number, updateBody: any): Promise<any> => {

    return new Promise(async (resolve, reject) => {

        await getLayoutByUserid(userID).then(async (layout) => {
            /// Get layout setting base on layout id of user
                const query = { layoutID: layout[0]._id }
                
                let layoutSetting = await layoutSchema.layoutSetting.find(query).exec()

            /// filter each settings that requested 
            updateBody.filter(async (module: {
                Enable: boolean;
                Default: boolean; FunctionSetting: any[]; moduleID: number;
            }) => {
                /// check module user request is existed
                let checkModuleExisted = await checkModuleExist(module.moduleID)

                if (checkModuleExisted === false) {
                    return reject("Error body")
                }
                if (!module.moduleID) {
                    return reject("Error body")
                }
                else {
                    /// check module existed
                    let checkSettingExist = layoutSetting.filter((e) => {

                        return e.moduleID === module.moduleID
                    })

                    let moduleChange: LayoutSetting = {
                        moduleID: 0,
                        Default: false,
                        layoutID: 0,
                        lastModifierId: 0
                    }

                    let compareModule = checkSettingExist[0]
                    // check config was in database
                    if (checkSettingExist.length === 1) {

                        if (module.Enable === true) {
                            // update function setting 

                            moduleChange.moduleID = module.moduleID
                            moduleChange.Default = module.Default
                            moduleChange.layoutID = + layout[0]._id
                            moduleChange.FunctionSetting = module.FunctionSetting
                            moduleChange.lastModifierId = + decoded._id

                            let idObj = { _id: compareModule._id };
                            let newValues = {
                                $set: moduleChange
                            };

                            layoutSchema.layoutSetting.findByIdAndUpdate(idObj, newValues, { upsert: true })
                        }
                        else if (module.Enable === false) {

                            layoutSchema.layoutSetting.deleteMany({ _id: compareModule._id })
                        }
                        else {

                            return resolve("Something Error!!!")
                        }
                    }
                    else {
                        const _id = await getIDCounter("LayoutSetting")

                        moduleChange._id = parseInt(_id)
                        moduleChange.moduleID = + module.moduleID
                        moduleChange.Default = module.Default
                        moduleChange.layoutID = parseInt(layout[0]._id)
                        moduleChange.FunctionSetting = module.FunctionSetting
                        moduleChange.createById = +decoded._id
                        moduleChange.lastModifierId = +decoded._id

                        layoutSchema.layoutSetting.insertMany([moduleChange])
                    }
                }
            })

            return resolve("Success")
        })
    })
}
